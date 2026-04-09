import { useState, useEffect } from "react"
import { FiSave, FiDollarSign, FiPackage, FiLayers, FiEdit2, FiCheck, FiChevronRight } from "react-icons/fi"
import { api } from "../../services/api"

const styles = {
  container: { padding: '24px' },
  header: { marginBottom: '24px' },
  title: { fontSize: '24px', fontWeight: '700', color: '#1a1a2e', margin: 0 },
  subtitle: { fontSize: '14px', color: '#666', marginTop: '4px' },
  message: { padding: '14px 20px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px', background: '#f5f5f5', padding: '6px', borderRadius: '12px', width: 'fit-content' },
  tab: { padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s ease' },
  tabActive: { background: '#f05a28', color: '#fff', boxShadow: '0 2px 8px rgba(240, 90, 40, 0.3)' },
  tabInactive: { background: 'transparent', color: '#666' },
  saveBtn: { padding: '12px 24px', background: '#f05a28', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s ease', marginBottom: '24px' },
  saveBtnDisabled: { background: '#ccc', cursor: 'not-allowed' },
  productList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' },
  productCard: { background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  productCardActive: { borderColor: '#f05a28', background: '#fff7f5' },
  productCardIcon: { width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginRight: '14px' },
  productCardInfo: { flex: 1 },
  productCardName: { fontSize: '15px', fontWeight: '700', margin: 0 },
  productCardRoute: { fontSize: '12px', color: '#999', marginTop: '2px' },
  categoryCard: { background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' },
  categoryHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px solid #f5f5f5' },
  categoryIcon: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  categoryTitle: { fontSize: '18px', fontWeight: '700', margin: 0 },
  planCard: { background: '#fafafa', borderRadius: '10px', padding: '20px', marginBottom: '12px', border: '1px solid #eee' },
  planCardLast: { marginBottom: 0 },
  planHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' },
  planLabel: { fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' },
  highlightBadge: { fontSize: '11px', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' },
  inputGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '12px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  inputLabel: { fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.3px' },
  input: { padding: '12px 14px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', transition: 'all 0.2s ease', background: '#fff' },
  inputFocus: { borderColor: '#f05a28', outline: 'none', boxShadow: '0 0 0 3px rgba(240, 90, 40, 0.1)' },
  priceInput: { fontWeight: '700', color: '#f05a28', fontSize: '16px' },
  loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', fontSize: '16px', color: '#666' },
  backBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#f5f5f5', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', color: '#333', marginBottom: '20px' },
}

function PricingManager() {
  const [pricing, setPricing] = useState([])
  const [productPricing, setProductPricing] = useState([])
  const [activeTab, setActiveTab] = useState("service")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [focusedInput, setFocusedInput] = useState(null)

  useEffect(() => {
    loadPricing()
  }, [])

  const loadPricing = async () => {
    try {
      const [serviceData, productData] = await Promise.all([
        api.getPricing(),
        api.getProductPricing()
      ])
      setPricing(serviceData || [])
      setProductPricing(productData || [])
    } catch (error) {
      console.error("Error loading pricing:", error)
      setMessage({ type: "error", text: "Failed to load pricing data" })
    } finally {
      setLoading(false)
    }
  }

  const updatePrice = (category, planIndex, field, value) => {
    const updated = pricing.map(p => {
      if (p.category === category) {
        const newPlans = [...p.plans]
        newPlans[planIndex] = { ...newPlans[planIndex], [field]: value }
        return { ...p, plans: newPlans }
      }
      return p
    })
    setPricing(updated)
  }

  const updateProductTier = (productId, tierIndex, field, value) => {
    const updated = productPricing.map(p => {
      if (p.productId === productId) {
        const newTiers = [...p.tiers]
        newTiers[tierIndex] = { ...newTiers[tierIndex], [field]: value }
        return { ...p, tiers: newTiers }
      }
      return p
    })
    setProductPricing(updated)
  }

  const saveServicePricing = async () => {
    setSaving(true)
    setMessage({ type: "", text: "" })
    try {
      for (const p of pricing) {
        await api.updatePricing(p.category, p)
      }
      setMessage({ type: "success", text: "✓ Service pricing saved successfully!" })
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } catch (error) {
      setMessage({ type: "error", text: "✗ Error saving pricing" })
    } finally {
      setSaving(false)
    }
  }

  const saveProductPricing = async () => {
    setSaving(true)
    setMessage({ type: "", text: "" })
    try {
      const product = productPricing.find(p => p.productId === selectedProduct)
      if (product) {
        await api.updateProductPricing(product.productId, product)
      }
      setMessage({ type: "success", text: "✓ Product pricing saved successfully!" })
      setTimeout(() => setMessage({ type: "", text: "" }), 3000)
    } catch (error) {
      setMessage({ type: "error", text: "✗ Error saving product pricing" })
    } finally {
      setSaving(false)
    }
  }

  const getInputStyle = (field) => ({
    ...styles.input,
    ...(focusedInput === field ? styles.inputFocus : {}),
    ...(field === 'price' ? styles.priceInput : {}),
  })

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId)
  }

  const handleBackToList = () => {
    setSelectedProduct(null)
  }

  const selectedProductData = productPricing.find(p => p.productId === selectedProduct)

  if (loading) {
    return <div style={styles.loading}>Loading pricing data...</div>
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>💰 Pricing Management</h1>
        <p style={styles.subtitle}>Manage your service and product pricing from one place</p>
      </div>

      {message.text && (
        <div style={{
          ...styles.message,
          background: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
        }}>
          {message.text}
        </div>
      )}

      <div style={styles.tabs}>
        <button
          onClick={() => { setActiveTab("service"); setSelectedProduct(null); }}
          style={{
            ...styles.tab,
            ...(activeTab === 'service' ? styles.tabActive : styles.tabInactive),
          }}
        >
          <FiLayers size={16} />
          Service Pricing
        </button>
        <button
          onClick={() => { setActiveTab("product"); setSelectedProduct(null); }}
          style={{
            ...styles.tab,
            ...(activeTab === 'product' ? styles.tabActive : styles.tabInactive),
          }}
        >
          <FiPackage size={16} />
          Product Pricing
        </button>
      </div>

      {activeTab === "service" && (
        <div>
          <button
            onClick={saveServicePricing}
            disabled={saving}
            style={{ ...styles.saveBtn, ...(saving ? styles.saveBtnDisabled : {}) }}
          >
            <FiSave size={18} />
            {saving ? "Saving..." : "Save All Changes"}
          </button>

          {pricing.map((category) => (
            <div key={category.category} style={styles.categoryCard}>
              <div style={styles.categoryHeader}>
                <div style={{ ...styles.categoryIcon, background: `${category.color}15`, color: category.color }}>
                  <FiDollarSign />
                </div>
                <h3 style={{ ...styles.categoryTitle, color: category.color }}>{category.category}</h3>
              </div>
              
              <div>
                {category.plans.map((plan, idx) => (
                  <div key={idx} style={{ ...styles.planCard, ...(idx === category.plans.length - 1 ? styles.planCardLast : {}) }}>
                    <div style={styles.planHeader}>
                      <span style={styles.planLabel}>Plan {idx + 1}</span>
                      {plan.highlight && (
                        <span style={{ ...styles.highlightBadge, background: `${category.color}15`, color: category.color }}>★ Popular</span>
                      )}
                    </div>
                    <div style={styles.inputGrid}>
                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>Plan Name</label>
                        <input type="text" value={plan.name} onChange={(e) => updatePrice(category.category, idx, "name", e.target.value)} style={getInputStyle('name')} onFocus={() => setFocusedInput('name')} onBlur={() => setFocusedInput(null)} />
                      </div>
                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>Price</label>
                        <input type="text" value={plan.price} onChange={(e) => updatePrice(category.category, idx, "price", e.target.value)} style={getInputStyle('price')} onFocus={() => setFocusedInput('price')} onBlur={() => setFocusedInput(null)} />
                      </div>
                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>Per</label>
                        <input type="text" value={plan.per} onChange={(e) => updatePrice(category.category, idx, "per", e.target.value)} style={getInputStyle('per')} onFocus={() => setFocusedInput('per')} onBlur={() => setFocusedInput(null)} />
                      </div>
                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>Tag</label>
                        <input type="text" value={plan.tag || ''} onChange={(e) => updatePrice(category.category, idx, "tag", e.target.value)} style={getInputStyle('tag')} onFocus={() => setFocusedInput('tag')} onBlur={() => setFocusedInput(null)} placeholder="e.g. Popular" />
                      </div>
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Description</label>
                      <input type="text" value={plan.desc} onChange={(e) => updatePrice(category.category, idx, "desc", e.target.value)} style={{...getInputStyle('desc'), width: '100%'}} onFocus={() => setFocusedInput('desc')} onBlur={() => setFocusedInput(null)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "product" && (
        <div>
          {selectedProduct ? (
            <div>
              <button style={styles.backBtn} onClick={handleBackToList}>
                ← Back to Products
              </button>
              
              <button
                onClick={saveProductPricing}
                disabled={saving}
                style={{ ...styles.saveBtn, ...(saving ? styles.saveBtnDisabled : {}) }}
              >
                <FiSave size={18} />
                {saving ? "Saving..." : "Save Changes"}
              </button>

              {selectedProductData && (
                <div style={styles.categoryCard}>
                  <div style={styles.categoryHeader}>
                    <div style={{ ...styles.categoryIcon, background: `${selectedProductData.color}15`, color: selectedProductData.color }}>
                      <FiPackage />
                    </div>
                    <div>
                      <h3 style={{ ...styles.categoryTitle, color: selectedProductData.color, margin: 0 }}>{selectedProductData.productName}</h3>
                      <span style={{ fontSize: '12px', color: '#999' }}>{selectedProductData.route}</span>
                    </div>
                  </div>
                  
                  <div>
                    {selectedProductData.tiers.map((tier, idx) => (
                      <div key={idx} style={{ ...styles.planCard, ...(idx === selectedProductData.tiers.length - 1 ? styles.planCardLast : {}) }}>
                        <div style={styles.planHeader}>
                          <span style={styles.planLabel}>Tier {idx + 1}</span>
                          {tier.highlight && (
                            <span style={{ ...styles.highlightBadge, background: `${selectedProductData.color}15`, color: selectedProductData.color }}>★ Popular</span>
                          )}
                        </div>
                        <div style={styles.inputGrid}>
                          <div style={styles.inputGroup}>
                            <label style={styles.inputLabel}>Tier Name</label>
                            <input type="text" value={tier.name} onChange={(e) => updateProductTier(selectedProduct, idx, "name", e.target.value)} style={getInputStyle('name')} onFocus={() => setFocusedInput('name')} onBlur={() => setFocusedInput(null)} />
                          </div>
                          <div style={styles.inputGroup}>
                            <label style={styles.inputLabel}>Price</label>
                            <input type="text" value={tier.price} onChange={(e) => updateProductTier(selectedProduct, idx, "price", e.target.value)} style={getInputStyle('price')} onFocus={() => setFocusedInput('price')} onBlur={() => setFocusedInput(null)} />
                          </div>
                          <div style={styles.inputGroup}>
                            <label style={styles.inputLabel}>Per</label>
                            <input type="text" value={tier.per} onChange={(e) => updateProductTier(selectedProduct, idx, "per", e.target.value)} style={getInputStyle('per')} onFocus={() => setFocusedInput('per')} onBlur={() => setFocusedInput(null)} />
                          </div>
                          <div style={styles.inputGroup}>
                            <label style={styles.inputLabel}>Description</label>
                            <input type="text" value={tier.desc} onChange={(e) => updateProductTier(selectedProduct, idx, "desc", e.target.value)} style={{...getInputStyle('desc'), width: '100%'}} onFocus={() => setFocusedInput('desc')} onBlur={() => setFocusedInput(null)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>Select a product to edit its pricing:</p>
              <div style={styles.productList}>
                {productPricing.map((product) => (
                  <div
                    key={product.productId}
                    style={styles.productCard}
                    onClick={() => handleProductSelect(product.productId)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ ...styles.productCardIcon, background: `${product.color}15`, color: product.color }}>
                        <FiPackage />
                      </div>
                      <div style={styles.productCardInfo}>
                        <p style={styles.productCardName}>{product.productName}</p>
                        <p style={styles.productCardRoute}>{product.route}</p>
                      </div>
                    </div>
                    <FiChevronRight style={{ color: '#ccc' }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PricingManager
