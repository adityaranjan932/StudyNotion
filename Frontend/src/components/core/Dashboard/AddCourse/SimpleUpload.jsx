import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

export default function SimpleUpload({
  name,
  label,
  register,
  setValue,
  errors,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles)
    const file = acceptedFiles[0]
    if (file) {
      console.log("Processing file:", file.name)
      
      // Create preview
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
      
      setSelectedFile(file)
      setValue(name, file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
    multiple: false,
  })

  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        <input {...getInputProps()} />
        
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setPreviewSource("")
                setSelectedFile(null)
                setValue(name, null)
              }}
              className="mt-3 text-richblack-400 underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an image, or{" "}
              <span className="font-semibold text-yellow-50">click to browse</span>
            </p>
            <ul className="mt-4 text-center text-xs text-richblack-200">
              <li>Recommended size: 1024x576</li>
              <li>Max file size: 5MB</li>
            </ul>
          </div>
        )}
      </div>
      
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
