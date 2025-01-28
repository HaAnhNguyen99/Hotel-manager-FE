import React, { useState } from 'react';
import { FaWifi, FaSnowflake, FaTv, FaBed, FaConciergeBell, FaMountain } from 'react-icons/fa';
import { MdKitchen } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  roomNumber: string;
  roomType: string;
  capacity: number;
  pricePerNight: string;
  isAvailable: boolean;
  amenities: string[];
  images: FileWithPath[];
}

interface Errors {
  roomNumber?: string;
  roomType?: string;
  pricePerNight?: string;
}

const RoomCreationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    roomNumber: '',
    roomType: '',
    capacity: 2,
    pricePerNight: '',
    isAvailable: true,
    amenities: [],
    images: [],
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const roomTypes: string[] = ['Standard Room', 'Deluxe Room', 'Suite', 'Executive Suite', 'Family Room'];

  const amenitiesList = [
    { icon: <FaWifi className="w-5 h-5" />, label: 'WiFi', value: 'wifi' },
    { icon: <FaSnowflake className="w-5 h-5" />, label: 'Air Conditioning', value: 'ac' },
    { icon: <MdKitchen className="w-5 h-5" />, label: 'Mini Refrigerator', value: 'fridge' },
    { icon: <FaTv className="w-5 h-5" />, label: 'Television', value: 'tv' },
    { icon: <FaBed className="w-5 h-5" />, label: 'King Size Bed', value: 'kingBed' },
    { icon: <FaMountain className="w-5 h-5" />, label: 'Balcony', value: 'balcony' },
    { icon: <FaConciergeBell className="w-5 h-5" />, label: 'Room Service', value: 'roomService' },
  ];

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxSize: 5242880,
    onDrop: (acceptedFiles: FileWithPath[]) => {
      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ],
      }));
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.roomNumber.trim()) {
      newErrors.roomNumber = 'Room number is required';
    }
    if (!formData.roomType) {
      newErrors.roomType = 'Room type is required';
    }
    if (parseFloat(formData.pricePerNight) <= 0) {
      newErrors.pricePerNight = 'Price must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success('Room created successfully!');
        setFormData({
          roomNumber: '',
          roomType: '',
          capacity: 2,
          pricePerNight: '',
          isAvailable: true,
          amenities: [],
          images: [],
        });
      } catch (error) {
        toast.error('Failed to create room');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Create New Room</h2>
            <p className="text-gray-600">Fill in the details to create a new hotel room</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Number</label>
                <input
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.roomNumber ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter Room Number"
                />
                {errors.roomNumber && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <BiError className="mr-1" />
                    {errors.roomNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Room Type</label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.roomType ? 'border-red-500' : ''
                  }`}>
                  <option value="">Select Room Type</option>
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.roomType && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <BiError className="mr-1" />
                    {errors.roomType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price per Night</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={formData.pricePerNight}
                    onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                    className={`pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors.pricePerNight ? 'border-red-500' : ''
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.pricePerNight && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <BiError className="mr-1" />
                    {errors.pricePerNight}
                  </p>
                )}
              </div>
            </div>

            {/* Other form fields remain unchanged */}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Creating...' : 'Create Room'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default RoomCreationForm;
