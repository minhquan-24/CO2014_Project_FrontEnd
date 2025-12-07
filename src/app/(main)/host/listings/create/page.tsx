'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { hostApi } from '@/app/service/api';

export default function CreateListingPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [types, setTypes] = useState<any[]>([]); 
    
    // State for custom amenity input
    const [newAmenity, setNewAmenity] = useState('');

    // State for form data
    const [formData, setFormData] = useState({
        title: '',
        city: 'Vung Tau, Ba Ria - Vung Tau', 
        typeId: '',
        description: '',
        pricePerNight: '',
        maxGuests: 2,
        amenities: [] as string[],
        numBedrooms: 0,
        numBathrooms: 0,
        numBeds: 0
    });

    // State for validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // 1. Fetch Accommodation Types
    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const data = await hostApi.getAccommodationTypes();
                setTypes(data);
                if (data.length > 0) setFormData(prev => ({ ...prev, typeId: data[0].Type_ID }));
            } catch (e) { console.error(e); }
        };
        fetchTypes();
    }, []);

    // 2. Amenities Logic (Add/Remove)
    const addAmenity = () => {
        if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
            setFormData({ ...formData, amenities: [...formData.amenities, newAmenity.trim()] });
            setNewAmenity('');
        }
    };

    const removeAmenity = (itemToRemove: string) => {
        setFormData({ ...formData, amenities: formData.amenities.filter(item => item !== itemToRemove) });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submit
            addAmenity();
        }
    };

    // 3. Validation Logic
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        else if (formData.title.length < 10) newErrors.title = 'Title must be at least 10 characters';

        if (!formData.city.trim()) newErrors.city = 'Location is required';
        if (!formData.typeId) newErrors.typeId = 'Property type is required';
        
        if (Number(formData.pricePerNight) < 50) newErrors.pricePerNight = 'Price must be at least 50$';
        if (Number(formData.maxGuests) < 1) newErrors.maxGuests = 'At least 1 guest required';

        setErrors(newErrors);
        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    // 4. Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            alert("Please check your input fields!");
            return;
        }

        setIsSubmitting(true);
        try {
            await hostApi.createListing(formData);
            alert("✅ Created successfully!");
            router.push('/host');
        } catch (err: any) {
            if (Array.isArray(err.message)) {
                 alert(err.message.join('\n'));
            } else {
                 alert(err.message || 'Failed to create listing');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Listing</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. LOCATION & TYPE */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">1. Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1">Property Type *</label>
                            <select 
                                className={`w-full border p-3 rounded-lg bg-white ${errors.typeId ? 'border-red-500' : ''}`}
                                value={formData.typeId} 
                                onChange={e => {
                                    setFormData({ ...formData, typeId: e.target.value });
                                    if(errors.typeId) setErrors({...errors, typeId: ''});
                                }}
                            >
                                <option value="" disabled>-- Select Type --</option>
                                {types.map((t) => (
                                    <option key={t.Type_ID} value={t.Type_ID}>{t.Type_Name}</option>
                                ))}
                            </select>
                            {errors.typeId && <p className="text-red-500 text-xs mt-1">{errors.typeId}</p>}
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1">Area (City, State) *</label>
                            <input 
                                type="text" 
                                className={`w-full border p-3 rounded-lg ${errors.city ? 'border-red-500' : ''}`}
                                placeholder="Ex: Vung Tau, Ba Ria - Vung Tau"
                                value={formData.city} 
                                onChange={e => {
                                    setFormData({ ...formData, city: e.target.value });
                                    if(errors.city) setErrors({...errors, city: ''});
                                }} 
                            />
                            <p className="text-xs text-gray-500 mt-1">Format: City Name, Province/State Name</p>
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                    </div>
                </div>

                {/* 2. DETAILS */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">2. Details</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Title *</label>
                            <input 
                                type="text" 
                                className={`w-full border p-3 rounded-lg ${errors.title ? 'border-red-500' : ''}`}
                                placeholder="Ex: Luxury Villa with Ocean View..."
                                value={formData.title} 
                                onChange={e => {
                                    setFormData({ ...formData, title: e.target.value });
                                    if(errors.title) setErrors({...errors, title: ''});
                                }} 
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold mb-1">Description</label>
                            <textarea 
                                rows={5} 
                                className="w-full border p-3 rounded-lg" 
                                placeholder="Describe your place..."
                                value={formData.description} 
                                onChange={e => setFormData({ ...formData, description: e.target.value })} 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Price / night ($) *</label>
                                <input 
                                    type="number" 
                                    className={`w-full border p-3 rounded-lg ${errors.pricePerNight ? 'border-red-500' : ''}`}
                                    value={formData.pricePerNight} 
                                    onChange={e => {
                                        setFormData({ ...formData, pricePerNight: e.target.value });
                                        if(errors.pricePerNight) setErrors({...errors, pricePerNight: ''});
                                    }} 
                                />
                                {errors.pricePerNight && <p className="text-red-500 text-xs mt-1">{errors.pricePerNight}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Max Guests *</label>
                                <input 
                                    type="number" 
                                    className={`w-full border p-3 rounded-lg ${errors.maxGuests ? 'border-red-500' : ''}`}
                                    value={formData.maxGuests} 
                                    onChange={e => {
                                        setFormData({ ...formData, maxGuests: Number(e.target.value) });
                                        if(errors.maxGuests) setErrors({...errors, maxGuests: ''});
                                    }} 
                                />
                                {errors.maxGuests && <p className="text-red-500 text-xs mt-1">{errors.maxGuests}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Bedrooms</label>
                                <input type="number" min="0" className="w-full border p-3 rounded-lg" 
                                    value={formData.numBedrooms} 
                                    onChange={e => setFormData({ ...formData, numBedrooms: e.target.value === '' ? 0 : parseFloat(e.target.value) })}  
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Beds</label>
                                <input type="number" min="0" className="w-full border p-3 rounded-lg" 
                                    value={formData.numBeds} 
                                    onChange={e => setFormData({ ...formData, numBeds: e.target.value === '' ? 0 : parseFloat(e.target.value) })}  
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Bathrooms</label>
                                <input type="number" min="0" className="w-full border p-3 rounded-lg" 
                                    value={formData.numBathrooms} 
                                    onChange={e => setFormData({ ...formData, numBathrooms: e.target.value === '' ? 0 : parseFloat(e.target.value) })}  
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. AMENITIES (CUSTOM INPUT) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">3. Amenities</h2>
                    
                    {/* Input Field */}
                    <div className="flex gap-2 mb-4">
                        <input 
                            type="text" 
                            className="flex-1 border p-2 rounded-lg outline-none focus:border-black"
                            placeholder="Add amenity (e.g. Wifi, Pool...)"
                            value={newAmenity}
                            onChange={(e) => setNewAmenity(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button 
                            type="button" 
                            onClick={addAmenity} 
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                        >
                            Add
                        </button>
                    </div>

                    {/* Tag List */}
                    <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((item, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-gray-300">
                                {item}
                                <button 
                                    type="button" 
                                    onClick={() => removeAmenity(item)} 
                                    className="text-gray-400 hover:text-red-500 font-bold"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        {formData.amenities.length === 0 && <span className="text-gray-400 italic text-sm">No amenities added yet.</span>}
                    </div>
                </div>

                {/* FOOTER BUTTONS */}
                <div className="flex gap-4 pt-4">
                    <Link href="/host" className="px-6 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition">
                        Cancel
                    </Link>
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="flex-1 bg-rose-600 text-white font-bold py-3 rounded-lg hover:bg-rose-700 disabled:bg-gray-400 transition"
                    >
                        {isSubmitting ? 'Processing...' : 'Create Listing'}
                    </button>
                </div>
            </form>
        </div>
    );
}