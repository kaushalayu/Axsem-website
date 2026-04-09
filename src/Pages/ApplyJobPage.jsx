import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FiBriefcase, FiUser, FiMail, FiFileText, FiSend } from "react-icons/fi"
import PageHero from "../Components/PageHero"
import { api } from "../services/api"
import { normalizeText } from "../utils/textUtils"
import "../Styles/ApplyJobPage.css"

const normalizeJob = (job) => ({
  ...job,
  title: normalizeText(job.title),
  description: normalizeText(job.description),
  type: normalizeText(job.type),
  location: normalizeText(job.location),
  role: normalizeText(job.role),
});

export default function ApplyJobPage() {
    const [searchParams] = useSearchParams()
    const jobId = searchParams.get('id')
    const [job, setJob] = useState(null)
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    useEffect(() => {
        if (jobId) {
            api.getCareers().then(jobs => {
                const found = jobs.find(j => j._id === jobId)
                if (found) setJob(normalizeJob(found))
            })
        }
    }, [jobId])

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Application submitted! (Backend integration pending)')
    }

    const jobInfo = job || {
        title: "Frontend Developer",
        type: "Full Time",
        location: "Remote / Hybrid",
        description: "We're looking for a passionate Frontend Developer who loves building clean, performant, and user-friendly web interfaces using modern technologies.",
        requirements: ["Strong fundamentals in HTML, CSS, JavaScript", "Experience with React or similar frameworks", "Problem-solving mindset", "Good communication skills"]
    }
    return (
        <div className="apply-page">

            {/* HERO */}
            <PageHero
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Careers", href: "/careers" },
                    { label: "Apply" },
                ]}
                pill="Apply Job"
                pillIcon={<FiBriefcase />}
                title={
                    <>
                        Apply for <span className="ph-gradient">Your Next Role</span>
                    </>
                }
                subtitle="Fill out the form below. Our hiring team reviews every application carefully."
                tag="AXSEM Careers"
            />

            {/* MAIN SECTION */}
            <section className="apply-section">

                {/* LEFT — JOB INFO */}
                <div className="apply-job-card">
                    <h2>{typeof jobInfo.title === 'string' ? jobInfo.title : 'Job Position'}</h2>
                    <p className="apply-job-type">{typeof jobInfo.type === 'string' ? jobInfo.type : ''} · {typeof jobInfo.location === 'string' ? jobInfo.location : ''}</p>

                    <p className="apply-job-desc">{typeof jobInfo.description === 'string' ? jobInfo.description : ''}</p>

                    <h4>What You'll Do</h4>
                    <ul>
                        <li>Build modern UI using React</li>
                        <li>Collaborate with designers & backend developers</li>
                        <li>Optimize performance and accessibility</li>
                        <li>Write clean, maintainable code</li>
                    </ul>

                    <h4>What We're Looking For</h4>
                    <ul>
                        {(jobInfo.requirements || []).map((req, i) => (
                            <li key={i}>{req}</li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT — APPLY FORM */}
                <div className="apply-form-card">
                    <h2>Apply Now</h2>

                    <form className="apply-form" onSubmit={handleSubmit}>

                        <div className="apply-field">
                            <label><FiUser /> Full Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>

                        <div className="apply-field">
                            <label><FiMail /> Email Address</label>
                            <input 
                                type="email" 
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>

                        <div className="apply-field">
                            <label><FiFileText /> Resume (PDF)</label>
                            <input type="file" accept=".pdf" />
                        </div>

                        <div className="apply-field">
                            <label>Cover Message (Optional)</label>
                            <textarea
                                rows="4"
                                placeholder="Tell us why you're a good fit for this role"
                                value={formData.message}
                                onChange={e => setFormData({...formData, message: e.target.value})}
                            />
                        </div>

                        <button type="submit" className="apply-submit">
                            Submit Application <FiSend />
                        </button>

                    </form>
                </div>

                {/* RIGHT — APPLY FORM */}
                <div className="apply-form-card">
                    <h2>Apply Now</h2>

                    <form className="apply-form">

                        <div className="apply-field">
                            <label><FiUser /> Full Name</label>
                            <input type="text" placeholder="Enter your full name" />
                        </div>

                        <div className="apply-field">
                            <label><FiMail /> Email Address</label>
                            <input type="email" placeholder="you@example.com" />
                        </div>

                        <div className="apply-field">
                            <label><FiFileText /> Resume (PDF)</label>
                            <input type="file" />
                        </div>

                        <div className="apply-field">
                            <label>Cover Message (Optional)</label>
                            <textarea
                                rows="4"
                                placeholder="Tell us why you’re a good fit for this role"
                            />
                        </div>

                        <button type="submit" className="apply-submit">
                            Submit Application <FiSend />
                        </button>

                    </form>
                </div>

            </section>
        </div>
    )
}