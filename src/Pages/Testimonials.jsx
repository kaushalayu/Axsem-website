import { useEffect, useState } from "react"
import { FiPlay, FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { api } from "../services/api"
import { Link } from "react-router-dom"

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeVideo, setActiveVideo] = useState(null)

    useEffect(() => {
        api.getTestimonials()
            .then(data => {
                if (data?.data) {
                    setTestimonials(data.data)
                } else if (Array.isArray(data)) {
                    setTestimonials(data)
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const videoTestimonials = testimonials.filter(t => t.type === 'video')
    const textTestimonials = testimonials.filter(t => t.type !== 'video')

    return (
        <div style={{ minHeight: '100vh', padding: '100px 20px 60px', background: '#0a0a0a' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: '#fff', fontSize: '42px', marginBottom: '10px', textAlign: 'center' }}>
                    Video <span style={{ color: '#f05a28' }}>Testimonials</span>
                </h1>
                <p style={{ color: '#888', textAlign: 'center', marginBottom: '50px', fontSize: '18px' }}>
                    Hear from our happy clients about their experience with Axsem
                </p>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px', color: '#666' }}>Loading...</div>
                ) : videoTestimonials.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px', color: '#666' }}>
                        No video testimonials yet. Add from admin panel.
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                            {videoTestimonials.map((t, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: '#1a1a1a',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s',
                                    }}
                                    onClick={() => setActiveVideo(t)}
                                >
                                    <div style={{ position: 'relative', aspectRatio: '16/9', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {t.thumbnail ? (
                                            <img src={t.thumbnail} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : null}
                                        <div style={{
                                            position: 'absolute',
                                            background: 'rgba(240,90,40,0.9)',
                                            borderRadius: '50%',
                                            width: '60px',
                                            height: '60px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <FiPlay style={{ color: '#fff', fontSize: '24px', marginLeft: '4px' }} />
                                        </div>
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: t.color || '#f05a28',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: '14px'
                                            }}>
                                                {t.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                            </div>
                                            <div>
                                                <div style={{ color: '#fff', fontWeight: '500' }}>{t.name}</div>
                                                <div style={{ color: '#888', fontSize: '13px' }}>{t.role}</div>
                                            </div>
                                        </div>
                                        {t.review && (
                                            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.5' }}>
                                                {t.review.length > 100 ? t.review.slice(0, 100) + '...' : t.review}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {textTestimonials.length > 0 && (
                            <>
                                <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '30px', marginTop: '60px' }}>Text Reviews</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                                    {textTestimonials.map((t, i) => (
                                        <div key={i} style={{ background: '#1a1a1a', borderRadius: '16px', padding: '24px' }}>
                                            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                                                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                                    <FiStar key={i} style={{ color: '#f05a28', fill: '#f05a28' }} />
                                                ))}
                                            </div>
                                            <p style={{ color: '#ccc', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>"{t.review}"</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '50%',
                                                    background: t.color || '#f05a28',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#fff',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {t.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                                </div>
                                                <div>
                                                    <div style={{ color: '#fff', fontWeight: '500' }}>{t.name}</div>
                                                    <div style={{ color: '#888', fontSize: '14px' }}>{t.role}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {activeVideo && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.95)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => setActiveVideo(null)}
                    >
                        <div style={{ maxWidth: '900px', width: '100%', padding: '20px' }} onClick={e => e.stopPropagation()}>
                            <video
                                src={activeVideo.videoUrl}
                                controls
                                autoPlay
                                style={{ width: '100%', borderRadius: '16px' }}
                            />
                            <div style={{ color: '#fff', marginTop: '20px', textAlign: 'center' }}>
                                <h3>{activeVideo.name}</h3>
                                <p style={{ color: '#888' }}>{activeVideo.role}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}