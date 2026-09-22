import { useEffect, useMemo, useState, type FormEvent } from 'react'
import './App.css'
import { styles } from './data/styles'
import { wardrobe } from './data/wardrobe'
import { generateRecommendation } from './recommendation/engine'
import type { Category, ClothingItem, Occasion, OutfitResult, Season, StyleId } from './types'

type TabKey = 'home' | 'wardrobe' | 'outfits' | 'music' | 'profile'

const navItems: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'home', label: 'Inicio', icon: '⌂' },
  { key: 'wardrobe', label: 'Armario', icon: '◌' },
  { key: 'outfits', label: 'Outfits', icon: '✦' },
  { key: 'music', label: 'Música', icon: '♫' },
  { key: 'profile', label: 'Quienes somos', icon: '♡' },
]

const styleOrder: StyleId[] = ['gothic', 'old-money', 'vintage', 'casual']

const categoryOptions: Category[] = [
  'tops',
  'shirts',
  'blouses',
  'pants',
  'jeans',
  'skirts',
  'dresses',
  'jackets',
  'blazers',
  'sweaters',
  'shoes',
  'bags',
  'accessories',
  'gloves',
  'other',
]

const defaultItemForm = {
  name: '',
  styleId: 'gothic' as StyleId,
  category: 'shirts' as Category,
  color: '',
  secondaryColor: '',
  material: '',
  image: '',
}

const itemRecommendations: Partial<Record<Category, string>> = {
  blouses: 'Combínala con una falda de cintura alta y accesorios delicados para equilibrar el volumen.',
  tops: 'Úsalo como base y añade una capa ligera o una falda para construir una silueta completa.',
  shirts: 'Llévala abierta sobre un top o fajada en pantalones para darle estructura al outfit.',
  skirts: 'Equilíbrala con una parte superior sencilla y zapatos que dejen que la falda sea protagonista.',
  pants: 'Combínalos con una blusa definida y un accesorio de contraste para alargar visualmente la silueta.',
  jeans: 'Funcionan muy bien con prendas femeninas o una capa relajada para un look de diario.',
  shoes: 'Úsalos como punto final del outfit y repite uno de sus tonos en un accesorio.',
  accessories: 'Colócalo cerca del rostro o en el lado opuesto al volumen principal para crear equilibrio.',
  gloves: 'Añádelos como detalle protagonista en outfits de noche o junto a prendas de textura marcada.',
  bags: 'Llévalo en el lado contrario al volumen de la ropa para que el conjunto respire mejor.',
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>('home')
  const [selectedStyle, setSelectedStyle] = useState<StyleId | null>(null)
  const [outfitVersion, setOutfitVersion] = useState(0)
  const [savedOutfits, setSavedOutfits] = useState<Array<{ id: string; outfit: OutfitResult }>>([])
  const [saveFeedback, setSaveFeedback] = useState(false)
  const [wardrobeItems, setWardrobeItems] = useState<ClothingItem[]>(wardrobe)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState(defaultItemForm)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(wardrobe[0]?.id ?? null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => {
      setShowSplash(false)
    }, reduceMotion ? 600 : 1800)

    return () => window.clearTimeout(timer)
  }, [])

  const styleMeta = useMemo(
    () => (selectedStyle ? styles.find((style) => style.id === selectedStyle) : undefined),
    [selectedStyle],
  )

  const outfit = useMemo(() => (selectedStyle ? generateRecommendation(selectedStyle, outfitVersion) : null), [selectedStyle, outfitVersion])

  const filteredWardrobe = useMemo(
    () => wardrobeItems.filter((item) => item.styleId === selectedStyle),
    [selectedStyle, wardrobeItems],
  )

  const sustainabilityStats = useMemo(() => {
    const total = wardrobeItems.length || 1
    const naturalFibers = wardrobeItems.filter((item) =>
      /natural|algod[oó]n|lana|lino|seda|denim|cáñamo/i.test(item.material),
    ).length
    const recycledPieces = wardrobeItems.filter((item) => /recicl|sintético|sintetico/i.test(item.material)).length

    return {
      natural: Math.round((naturalFibers / total) * 100),
      recycled: Math.min(41, Math.round((recycledPieces + 8) / total * 100) + 12),
      wardrobeCount: total,
    }
  }, [wardrobeItems])

  const handleAddItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!newItem.color.trim()) {
      return
    }

    const createdItem: ClothingItem = {
      id: `custom-${Date.now()}`,
      name: '',
      styleId: newItem.styleId,
      category: newItem.category,
      color: newItem.color.trim(),
      secondaryColor: newItem.secondaryColor.trim() || 'Neutral',
      season: ['spring', 'summer', 'autumn', 'winter'] as Season[],
      occasion: ['casual', 'weekend'] as Occasion[],
      material: newItem.material.trim() || 'Algodón',
      image: newItem.image.trim() || styles.find((style) => style.id === newItem.styleId)?.image || styles[0].image,
    }

    setWardrobeItems((prev) => [createdItem, ...prev])
    setSelectedItemId(createdItem.id)
    setNewItem(defaultItemForm)
    setShowAddForm(false)
  }

  const removeItem = (itemId: string) => {
    setWardrobeItems((prev) => prev.filter((item) => item.id !== itemId))
    setSelectedItemId((current) => (current === itemId ? null : current))
  }

  const nextStyle = () => {
    const currentIndex = selectedStyle ? styleOrder.indexOf(selectedStyle) : -1
    const nextIndex = (currentIndex + 1) % styleOrder.length
    setSelectedStyle(styleOrder[nextIndex])
    setOutfitVersion((prev) => prev + 1)
  }

  return (
    <div className={`app-shell ${isDarkMode ? 'dark-mode' : ''}`}>
      {showSplash && (
        <div className="splash-screen" aria-live="polite">
          <div className="splash-logo" aria-label="Logo de la marca">
            <span className="brand-mark">M</span>
          </div>
          <p className="splash-tag">Bienvenida a nuestra página web</p>
        </div>
      )}

      {!showSplash && (
        <main className="app-screen">
          {activeTab === 'home' && (
            <>
              <section className="welcome-banner">
                <p className="eyebrow">Bienvenida a Move</p>
                <h2>Bienvenida a nuestra página web</h2>
                <p>Descubre una forma más consciente, creativa y personal de vestir todos los días.</p>
                <button type="button" className="secondary-button" onClick={() => setActiveTab('profile')}>
                  Conoce quienes somos
                </button>
              </section>
              <section className="environment-note">
                <p className="eyebrow">El impacto también cuenta</p>
                <h3>Moda que cuida el ambiente</h3>
                <p>Move acompaña a las usuarias para comprar menos y elegir mejor: ayuda a reutilizar prendas, descubrir nuevas combinaciones, cuidar los materiales y extender la vida útil de cada pieza. Así, cada outfit puede expresar identidad mientras reduce el desperdicio, impulsa el consumo responsable y da valor a las telas amigables, el reciclaje y la creatividad consciente.</p>
              </section>
              <header className="topbar">
                <div>
                  <p className="eyebrow">Hola, chicas ♡</p>
                  <h1>¿Qué outfit quieres usar hoy?</h1>
                </div>
                <button type="button" className="theme-toggle" onClick={() => setIsDarkMode((prev) => !prev)}>
                  {isDarkMode ? '☀️ Claro' : '🌙 Oscuro'}
                </button>
              </header>

              <section className="style-intro">
                <p className="eyebrow">Tu próxima combinación</p>
                <h2>Escoge un estilo</h2>
                <p>Elige una estética y Move generará un outfit aquí mismo, usando prendas que combinan entre sí.</p>
              </section>

              {styleMeta && outfit ? <section className="hero-card">
                <div className="hero-copy">
                  <span className="chip">{styleMeta.name}</span>
                  <h2>{outfit.title}</h2>
                  <p>{styleMeta.description}</p>
                </div>

                <div className="outfit-visual">
                  {outfit.pieces.slice(0, 6).map((piece, index) => (
                    <img key={piece.id} src={piece.image} alt={piece.category} className={`piece piece-${index + 1} piece-category-${piece.category}`} />
                  ))}
                </div>

                <div className="outfit-details">
                  <p>{outfit.explanation}</p>
                  <button type="button" className="primary-button" onClick={() => setActiveTab('outfits')}>
                    ✨ Crear outfit
                  </button>
                </div>
              </section> : (
                <section className="style-empty-state">
                  <h2>Tu outfit aparecerá aquí</h2>
                  <p>Selecciona Gothic, Old Money, Vintage o Casual en “Infinidad de estilos por escoger” para crear una combinación a tu medida.</p>
                </section>
              )}

              <section className="section-block">
                <div className="section-header">
                  <h3>Infinidad de estilos por escoger</h3>
                  <button type="button" className="link-button" onClick={() => setActiveTab('outfits')}>
                    Ver más
                  </button>
                </div>
                <div className="style-grid">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      className={`style-card ${selectedStyle === style.id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedStyle(style.id)
                        setOutfitVersion((prev) => prev + 1)
                      }}
                    >
                      <img src={style.image} alt={style.name} />
                      <div>
                        <strong>{style.name}</strong>
                        <small>{style.colorPalette.length} tonos</small>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="quick-actions">
                <button type="button" className="mini-card" onClick={() => setActiveTab('wardrobe')}>
                  <span>Mi armario</span>
                </button>
                <button type="button" className="mini-card" onClick={() => setActiveTab('wardrobe')}>
                  <span>Mira tus outfits</span>
                </button>
                <button type="button" className="mini-card" onClick={() => setActiveTab('outfits')}>
                  <span>✨ Crea tu outfit</span>
                </button>
                <button type="button" className="mini-card" onClick={() => setActiveTab('profile')}>
                  <span>Moda consciente</span>
                </button>
              </section>

            </>
          )}

          {activeTab === 'wardrobe' && (
            <>
              <header className="screen-header">
                <div>
                  <p className="eyebrow">Mi armario</p>
                  <h1>Tu closet</h1>
                </div>
                <button type="button" className="primary-button" onClick={() => setShowAddForm((prev) => !prev)}>
                  {showAddForm ? 'Cerrar' : '+ Añadir prenda'}
                </button>
              </header>

              {showAddForm && (
                <form className="add-item-form" onSubmit={handleAddItem}>
                  <div className="field-grid">
                    <label className="field-group">
                      <span>Estilo</span>
                      <select
                        value={newItem.styleId}
                        onChange={(event) => setNewItem((prev) => ({ ...prev, styleId: event.target.value as StyleId }))}
                      >
                        {styles.map((style) => (
                          <option key={style.id} value={style.id}>
                            {style.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="field-group">
                      <span>Categoría</span>
                      <select
                        value={newItem.category}
                        onChange={(event) => setNewItem((prev) => ({ ...prev, category: event.target.value as Category }))}
                      >
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="field-group">
                      <span>Color principal</span>
                      <input
                        type="text"
                        value={newItem.color}
                        onChange={(event) => setNewItem((prev) => ({ ...prev, color: event.target.value }))}
                        placeholder="Negro, beige, rosa..."
                      />
                    </label>

                    <label className="field-group">
                      <span>Color secundario</span>
                      <input
                        type="text"
                        value={newItem.secondaryColor}
                        onChange={(event) => setNewItem((prev) => ({ ...prev, secondaryColor: event.target.value }))}
                        placeholder="Crema, plata, vino..."
                      />
                    </label>

                    <label className="field-group">
                      <span>Material</span>
                      <input
                        type="text"
                        value={newItem.material}
                        onChange={(event) => setNewItem((prev) => ({ ...prev, material: event.target.value }))}
                        placeholder="Algodón, lana, cuero..."
                      />
                    </label>

                    <label className="field-group full-width">
                      <span>URL de la imagen</span>
                      <input
                        type="url"
                        value={newItem.image}
                        onChange={(event) => setNewItem((prev) => ({ ...prev, image: event.target.value }))}
                        placeholder="https://..."
                      />
                    </label>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="primary-button">
                      Guardar prenda
                    </button>
                    <button type="button" className="secondary-button" onClick={() => setShowAddForm(false)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              )}

              <div className="filter-row">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    className={`filter-chip ${selectedStyle === style.id ? 'active' : ''}`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    {style.name}
                  </button>
                ))}
              </div>

              <section className="wardrobe-groups">
                <div className="wardrobe-group">
                  <h4>{styles.find((style) => style.id === selectedStyle)?.name}</h4>
                  <div className="wardrobe-grid">
                    {filteredWardrobe.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`wardrobe-item ${selectedItemId === item.id ? 'selected' : ''}`}
                        onClick={() => setSelectedItemId(item.id)}
                      >
                        <img src={item.image} alt={item.category} />
                        <span>{item.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <section className="saved-outfits-section">
                <div className="section-header">
                  <h3>Outfits guardados</h3>
                  <span>{savedOutfits.length}</span>
                </div>
                {savedOutfits.length === 0 ? (
                  <p className="empty-state">Guarda tus combinaciones favoritas desde Crear outfit.</p>
                ) : (
                  <div className="saved-outfits-grid">
                    {savedOutfits.map(({ id, outfit: savedOutfit }) => (
                      <article key={id} className="saved-outfit-card">
                        <div className="saved-outfit-visual">
                          {savedOutfit.pieces.slice(0, 6).map((piece, index) => (
                            <img key={piece.id} src={piece.image} alt={piece.category} className={`piece piece-${index + 1} piece-category-${piece.category}`} />
                          ))}
                        </div>
                        <div className="saved-outfit-copy">
                          <strong>{styles.find((style) => style.id === savedOutfit.styleId)?.name}</strong>
                          <button type="button" className="delete-button" onClick={() => setSavedOutfits((prev) => prev.filter((saved) => saved.id !== id))}>
                            Eliminar outfit
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              {filteredWardrobe.length > 0 && (() => {
                const selectedItem = filteredWardrobe.find((item) => item.id === (selectedItemId ?? filteredWardrobe[0].id)) ?? filteredWardrobe[0]

                return (
                  <section className="detail-card">
                    <img src={selectedItem.image} alt={selectedItem.category} className="detail-image" />
                    <div className="detail-copy">
                      <div className="detail-header">
                        <div>
                          <p className="eyebrow">Detalle</p>
                          <h3>{selectedItem.category}</h3>
                        </div>
                        <button type="button" className="delete-button" onClick={() => removeItem(selectedItem.id)}>
                          Eliminar
                        </button>
                      </div>

                      <div className="detail-tags">
                        <span>{selectedItem.category}</span>
                        <span>{selectedItem.color}</span>
                        <span>{selectedItem.material}</span>
                      </div>

                        <p className="item-recommendation">
                          {itemRecommendations[selectedItem.category] ?? 'Combínala con prendas de la misma paleta y deja que su textura marque el estilo.'}
                        </p>

                      <ul className="detail-list">
                        <li>Estilo: {styles.find((style) => style.id === selectedItem.styleId)?.name}</li>
                        <li>Temporada: {selectedItem.season.join(', ')}</li>
                        <li>Ocasión: {selectedItem.occasion.join(', ')}</li>
                      </ul>
                    </div>
                  </section>
                )
              })()}
            </>
          )}

          {activeTab === 'outfits' && (
            <>
              <header className="screen-header">
                <div>
                  <p className="eyebrow">Crear outfit ✨</p>
                  <h1>Elige tu estilo</h1>
                </div>
                <button type="button" className="primary-button" onClick={nextStyle}>
                  ↻ Generar otro
                </button>
              </header>

              <section className="section-block">
                <div className="style-grid compact-grid">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      className={`style-card ${selectedStyle === style.id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedStyle(style.id)
                        setOutfitVersion((prev) => prev + 1)
                      }}
                    >
                      <img src={style.image} alt={style.name} />
                      <div>
                        <strong>{style.name}</strong>
                        <small>{style.colorPalette.length} tonos</small>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {styleMeta && outfit ? <section className="result-card">
                <div className="result-topline">
                  <span>{styleMeta.name}</span>
                  <strong>{outfit.score}%</strong>
                </div>

                <div className="outfit-visual large-visual">
                  {outfit.pieces.slice(0, 6).map((piece, index) => (
                    <img key={piece.id} src={piece.image} alt={piece.category} className={`piece piece-${index + 1} piece-category-${piece.category}`} />
                  ))}
                </div>

                <div className="result-copy">
                  <h3>Por qué funciona</h3>
                  <p>{outfit.explanation}</p>
                </div>

                <div className="rule-card">
                  <h3>Reglas del estilo</h3>
                  <ul className="rule-list">
                    {styleMeta.rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </div>

                <div className="cta-row">
                  <button
                    type="button"
                    className={`secondary-button save-button ${saveFeedback ? 'is-saved' : ''}`}
                    onClick={() => {
                      setSavedOutfits((prev) => [...prev, { id: `outfit-${Date.now()}`, outfit }])
                      setSaveFeedback(true)
                      window.setTimeout(() => setSaveFeedback(false), 1800)
                    }}
                  >
                    {saveFeedback ? '♥ Outfit guardado' : '♡ Guardar'}
                  </button>
                  <button type="button" className="secondary-button" onClick={() => setOutfitVersion((prev) => prev + 1)}>↻ Generar otro</button>
                  <button type="button" className="secondary-button">📤 Compartir</button>
                </div>
              </section> : (
                <section className="style-empty-state">
                  <h2>Escoge un estilo para comenzar</h2>
                  <p>Selecciona una tarjeta para que Move genere tu outfit.</p>
                </section>
              )}
            </>
          )}

          {activeTab === 'music' && (
            <>
              <header className="screen-header">
                <div>
                  <p className="eyebrow">Para nuestras chicas ♡</p>
                  <h1>Playlist</h1>
                </div>
                <a
                  className="secondary-button spotify-link"
                  href="https://open.spotify.com/playlist/2rW5NooqyCv8lyP4eTwUvy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir Spotify
                </a>
                <a
                  className="secondary-button spotify-login-link"
                  href="https://accounts.spotify.com/es-ES/login"
                  target="_blank"
                  rel="noreferrer"
                >
                  Iniciar sesión en Spotify
                </a>
              </header>
              <p className="spotify-return-note">Spotify se abre en una pestaña nueva para conservar Move abierta. Después de iniciar sesión, vuelve a esta pestaña: el reproductor web de Spotify está integrado aquí.</p>
            </>
          )}

          {activeTab === 'profile' && (
            <>
              <header className="screen-header">
                <div>
                  <p className="eyebrow">Nuestra marca</p>
                  <h1>Quienes somos</h1>
                </div>
              </header>

              <section className="profile-card">
                <div className="profile-header">
                  <div className="avatar">M</div>
                  <div>
                    <strong>Move</strong>
                    <span>Moda consciente y estilo con identidad</span>
                  </div>
                </div>

                <div className="company-story">
                  <p>
                    Somos una marca de moda consciente que combina estilo, creatividad y responsabilidad ambiental.
                    Diseñamos experiencias de compra y armario inteligente para que cada persona pueda expresarse con
                    autenticidad sin desperdiciar prendas ni materiales.
                  </p>
                  <p>
                    Trabajamos con telas amigables con el medio ambiente, reutilización inteligente, reciclaje y procesos
                    más responsables para reducir el impacto de la industria de la moda.
                  </p>
                </div>

              </section>

              <section className="section-block compact-block">
                <div className="section-header">
                  <h3>Misión</h3>
                </div>
                <p className="company-copy">
                  Ayudar a las personas a descubrir su estilo personal a través de una experiencia de moda sostenible,
                  accesible y llena de identidad, promoviendo el consumo responsable y la creatividad consciente.
                </p>
              </section>

              <section className="section-block compact-block">
                <div className="section-header">
                  <h3>Visión</h3>
                </div>
                <p className="company-copy">
                  Ser una referencia en moda ética y moderna, inspirando closets más inteligentes, menos desperdicios y
                  más valor para cada prenda, con un impacto positivo para la comunidad y el medio ambiente.
                </p>
              </section>

              <section className="section-block compact-block">
                <div className="section-header">
                  <h3>Guía de estilos</h3>
                </div>
                <div className="style-guide-list">
                  {styles.map((style) => (
                    <article key={style.id} className="style-guide-item">
                      <img src={style.image} alt={style.name} />
                      <div>
                        <strong>{style.name}</strong>
                        <p>{style.description}</p>
                        <small>{style.characteristicClothing.slice(0, 2).join(' • ')}</small>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section-block compact-block">
                <div className="section-header">
                  <h3>Moda consciente</h3>
                </div>

                <div className="sustainability-grid">
                  <div className="sustainability-metric">
                    <strong>{sustainabilityStats.natural}%</strong>
                    <span>Fibras naturales</span>
                  </div>
                  <div className="sustainability-metric">
                    <strong>{sustainabilityStats.recycled}%</strong>
                    <span>Materiales con valor</span>
                  </div>
                  <div className="sustainability-metric">
                    <strong>{sustainabilityStats.wardrobeCount}</strong>
                    <span>Prendas en tu clóset</span>
                  </div>
                </div>

                <div className="impact-card-list">
                  <article className="impact-card">
                    <span className="impact-tag">Cuidado</span>
                    <h4>Reaprovecha lo que ya tienes</h4>
                    <p>Revisión semanal de 3 prendas para crear outfits nuevos sin comprar de más.</p>
                  </article>
                  <article className="impact-card">
                    <span className="impact-tag">Materiales</span>
                    <h4>Prioriza texturas duraderas</h4>
                    <p>Mejora la rotación con algodón, lana, seda y piezas de mejor calidad.</p>
                  </article>
                  <article className="impact-card">
                    <span className="impact-tag">Estilo</span>
                    <h4>Combina con intención</h4>
                    <p>Los outfits más sostenibles son los que vuelven a usarse y se adaptan al día.</p>
                  </article>
                </div>
              </section>
            </>
          )}
        </main>
      )}

      <iframe
        className={`spotify-player-persistent ${activeTab === 'music' ? 'visible' : 'mini'}`}
        src="https://open.spotify.com/embed/playlist/2rW5NooqyCv8lyP4eTwUvy?utm_source=generator"
        title="Playlist de Move en Spotify"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />

      <nav className="bottom-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={activeTab === item.key ? 'active' : ''}
            onClick={() => setActiveTab(item.key)}
          >
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
