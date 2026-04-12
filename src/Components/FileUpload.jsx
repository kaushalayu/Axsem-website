import { useState, useRef } from "react"
import { FiUpload, FiX, FiFile, FiAlertCircle, FiCheck } from "react-icons/fi"

export default function FileUpload({ 
  files = [], 
  onFilesChange, 
  maxSize = 5, 
  accept = ".pdf,.jpg,.jpeg,.png",
  maxFiles = 5 
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState([])
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    const errors = []
    const maxSizeBytes = maxSize * 1024 * 1024

    if (file.size > maxSizeBytes) {
      errors.push(`${file.name} exceeds ${maxSize}MB limit`)
    }

    const acceptedTypes = accept.split(',').map(t => t.trim().toLowerCase())
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    const fileMimeType = file.type.toLowerCase()

    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return type === fileExtension
      }
      return fileMimeType.includes(type.replace('*', ''))
    })

    if (!isValidType) {
      errors.push(`${file.name} has invalid file type`)
    }

    return errors
  }

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles)
    const allErrors = []
    const validFiles = []

    fileArray.forEach(file => {
      const fileErrors = validateFile(file)
      if (fileErrors.length > 0) {
        allErrors.push(...fileErrors)
      } else {
        validFiles.push({
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        })
      }
    })

    if (allErrors.length > 0) {
      setErrors(allErrors)
      setTimeout(() => setErrors([]), 5000)
    }

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles].slice(0, maxFiles)
      onFilesChange(updatedFiles)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleInputChange = (e) => {
    const selectedFiles = e.target.files
    if (selectedFiles.length > 0) {
      handleFiles(selectedFiles)
    }
    e.target.value = ''
  }

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    onFilesChange(updatedFiles)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️'
    if (type.includes('pdf')) return '📄'
    return '📎'
  }

  return (
    <div className="fu-container">
      <div 
        className={`fu-dropzone ${isDragging ? 'dragging' : ''} ${errors.length > 0 ? 'has-error' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleInputChange}
          className="fu-input"
        />
        
        <div className="fu-dropzone-content">
          <div className="fu-upload-icon">
            <FiUpload />
          </div>
          <h4>Drag & Drop files here</h4>
          <p>or click to browse</p>
          <span className="fu-hint">
            Accepted: PDF, JPG, PNG (Max {maxSize}MB each, up to {maxFiles} files)
          </span>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="fu-errors">
          {errors.map((error, i) => (
            <div key={i} className="fu-error">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="fu-files">
          <div className="fu-files-header">
            <span>{files.length} of {maxFiles} files uploaded</span>
            <div className="fu-progress-bar">
              <div 
                className="fu-progress-fill" 
                style={{ width: `${(files.length / maxFiles) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="fu-files-list">
            {files.map((file, index) => (
              <div key={index} className="fu-file-item">
                <div className="fu-file-preview">
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} />
                  ) : (
                    <span className="fu-file-icon">{getFileIcon(file.type)}</span>
                  )}
                </div>
                <div className="fu-file-info">
                  <span className="fu-file-name">{file.name}</span>
                  <span className="fu-file-size">{formatFileSize(file.size)}</span>
                </div>
                <button 
                  className="fu-file-remove"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                >
                  <FiX />
                </button>
                <div className="fu-file-check">
                  <FiCheck />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
