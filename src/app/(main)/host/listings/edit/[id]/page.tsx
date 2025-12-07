// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Link from 'next/link';
// import { hostApi } from '@/app/service/api';

// const AMENITIES_OPTIONS = ['Wifi', 'TV', 'Kitchen', 'Air conditioning', 'Pool', 'Parking'];

// export default function EditListingPage() {
//     const router = useRouter();
//     const params = useParams();
//     const id = params?.id as string;
    
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [types, setTypes] = useState<any[]>([]); 

//     const [formData, setFormData] = useState({
//         title: '',
//         city: '',
//         typeId: '',
//         description: '',
//         pricePerNight: 0,
//         maxGuests: 1,
//         numBeds: 0,
//         numBedrooms: 0,
//         numBathrooms: 0,
//         amenities: [] as string[],
//     });

//     // 1. Fetch Data & Types
//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 // Gọi song song lấy Types và Chi tiết nhà
//                 const [typesData, listingData] = await Promise.all([
//                     hostApi.getAccommodationTypes(),
//                     hostApi.getListingForEdit(id)
//                 ]);
                
//                 console.log("🔥 Dữ liệu Edit:", listingData);

//                 setTypes(typesData);
                
//                 // Map dữ liệu từ Backend vào Form
//                 setFormData({
//                     title: listingData.Title || '',
//                     city: listingData.City || '',
//                     typeId: listingData.Type_ID || '',
//                     description: listingData.Description || '',
                    
//                     pricePerNight: listingData.Price_Per_Night ? Number(listingData.Price_Per_Night) : 0,
//                     maxGuests: listingData.Max_Guests ? Number(listingData.Max_Guests) : 1,
                    
//                     numBeds: listingData.Num_Beds ? Number(listingData.Num_Beds) : 0,
//                     numBedrooms: listingData.Num_Bedrooms ? Number(listingData.Num_Bedrooms) : 0,
//                     numBathrooms: listingData.Num_Bathrooms ? Number(listingData.Num_Bathrooms) : 0,
                    
//                     amenities: listingData.Amenities || [],
//                 })} catch (error) {
//                 console.error(error);
//                 alert("Không thể tải thông tin nhà hoặc bạn không có quyền sửa.");
//                 router.push('/host');
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         if(id) loadData();
//     }, [id]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         try {
//             await hostApi.updateListing(id, formData);
//             alert(`✅ Cập nhật thành công!`);
//             router.push('/host');
//         } catch (error) {
//             alert('Cập nhật thất bại.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const toggleAmenity = (item: string) => {
//         if (formData.amenities.includes(item)) {
//             setFormData({ ...formData, amenities: formData.amenities.filter(i => i !== item) });
//         } else {
//             setFormData({ ...formData, amenities: [...formData.amenities, item] });
//         }
//     };

//     if (isLoading) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

//     return (
//         <div className="container mx-auto px-4 py-10 max-w-3xl min-h-screen">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa nhà</h1>
//                 <div className="text-gray-500 text-sm">ID: {id}</div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-8">
                
//                 {/* 1. LOCATION & TYPE */}
//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                     <h2 className="text-xl font-bold mb-4">Vị trí & Loại hình</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="col-span-2">
//                             <label className="block text-sm font-bold mb-1">Loại hình</label>
//                             <select required className="w-full border p-3 rounded-lg bg-white" 
//                                 value={formData.typeId} onChange={e => setFormData({ ...formData, typeId: e.target.value })}>
//                                 {types.map((t) => <option key={t.Type_ID} value={t.Type_ID}>{t.Type_Name}</option>)}
//                             </select>
//                         </div>
//                         <div className="col-span-2">
//                             <label className="block text-sm font-bold mb-1">Khu vực (Thành phố, Bang)</label>
//                             <select className="w-full border p-3 rounded-lg bg-white" 
//                                 value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
//                                 <option value="Vung Tau, Ba Ria - Vung Tau">Vung Tau, Ba Ria - Vung Tau</option>
//                                 <option value="Hanoi, Hanoi">Hanoi, Hanoi</option>
//                                 <option value="Ho Chi Minh City, Ho Chi Minh">Ho Chi Minh City, Ho Chi Minh</option>
//                                 {/* ... thêm các option khác */}
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 2. DETAILS */}
//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                     <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-bold mb-1">Title</label>
//                             <input required type="text" className="w-full border p-3 rounded-lg" 
//                                 value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-bold mb-1">Mô tả</label>
//                             <textarea rows={5} className="w-full border p-3 rounded-lg" 
//                                 value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-bold mb-1">Giá (VNĐ)</label>
//                                 <input required type="number" className="w-full border p-3 rounded-lg" 
//                                     value={formData.pricePerNight} onChange={e => setFormData({ ...formData, pricePerNight: Number(e.target.value) })} />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-bold mb-1">Khách tối đa</label>
//                                 <input required type="number" className="w-full border p-3 rounded-lg" 
//                                     value={formData.maxGuests} onChange={e => setFormData({ ...formData, maxGuests: Number(e.target.value) })} />
//                             </div>
//                         </div>

//                         {/* 👇 3 TRƯỜNG MỚI */}
//                         <div className="grid grid-cols-3 gap-4 pt-2">
//                             <div>
//                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phòng ngủ</label>
//                                 <input type="number" min="0" className="w-full border p-2 rounded-lg" 
//                                     value={formData.numBedrooms} onChange={e => setFormData({ ...formData, numBedrooms: Number(e.target.value) })} />
//                             </div>
//                             <div>
//                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Giường</label>
//                                 <input type="number" min="0" className="w-full border p-2 rounded-lg" 
//                                     value={formData.numBeds} onChange={e => setFormData({ ...formData, numBeds: Number(e.target.value) })} />
//                             </div>
//                             <div>
//                                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phòng tắm</label>
//                                 <input type="number" min="0" className="w-full border p-2 rounded-lg" 
//                                     value={formData.numBathrooms} onChange={e => setFormData({ ...formData, numBathrooms: Number(e.target.value) })} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 3. AMENITIES */}
//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                     <h2 className="text-xl font-bold mb-4">Tiện nghi</h2>
//                     <div className="grid grid-cols-2 gap-3">
//                         {AMENITIES_OPTIONS.map(option => (
//                             <label key={option} className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
//                                 <input type="checkbox" className="w-5 h-5 accent-black" 
//                                     checked={formData.amenities.includes(option)} onChange={() => toggleAmenity(option)} />
//                                 <span className="text-sm">{option}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* ACTION BUTTONS */}
//                 <div className="flex gap-4 pt-4 sticky bottom-0 bg-white p-4 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
//                     <Link href="/host" className="px-6 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition">
//                         Quay lại
//                     </Link>
//                     <button type="submit" disabled={isSubmitting} className="flex-1 bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400">
//                         {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
//                     </button>
//                 </div>

//             </form>
//         </div>
//     );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { hostApi } from '@/app/service/api';

export default function EditListingPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [types, setTypes] = useState<any[]>([]); 
    
    // State for custom amenity input
    const [newAmenity, setNewAmenity] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        city: '',
        typeId: '',
        description: '',
        pricePerNight: 0,
        maxGuests: 1,
        numBeds: 0,
        numBedrooms: 0,
        numBathrooms: 0,
        amenities: [] as string[],
    });

    // State for validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // 1. Fetch Data
    useEffect(() => {
        const loadData = async () => {
            try {
                const [typesData, listingData] = await Promise.all([
                    hostApi.getAccommodationTypes(),
                    hostApi.getListingForEdit(id)
                ]);
                
                setTypes(typesData);
                
                setFormData({
                    title: listingData.Title || '',
                    city: listingData.City || '',
                    typeId: listingData.Type_ID || '',
                    description: listingData.Description || '',
                    
                    pricePerNight: listingData.Price_Per_Night ? Number(listingData.Price_Per_Night) : 0,
                    maxGuests: listingData.Max_Guests ? Number(listingData.Max_Guests) : 1,
                    
                    numBeds: listingData.Num_Beds ? Number(listingData.Num_Beds) : 0,
                    numBedrooms: listingData.Num_Bedrooms ? Number(listingData.Num_Bedrooms) : 0,
                    numBathrooms: listingData.Num_Bathrooms ? Number(listingData.Num_Bathrooms) : 0,
                    
                    amenities: listingData.Amenities || [],
                });
            } catch (error) {
                console.error(error);
                alert("Failed to load listing data.");
                router.push('/host');
            } finally {
                setIsLoading(false);
            }
        };
        if(id) loadData();
    }, [id]);

    // 2. Validate Logic
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        else if (formData.title.length < 10) newErrors.title = 'Title is too short (min 10 characters)';

        if (!formData.city.trim()) newErrors.city = 'Location is required';
        if (!formData.typeId) newErrors.typeId = 'Please select a property type';
        
        if (Number(formData.pricePerNight) < 50) newErrors.pricePerNight = 'Price must be at least 50$';
        if (Number(formData.maxGuests) < 1) newErrors.maxGuests = 'At least 1 guest required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 3. Submit Update
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            alert("Please check your input fields!");
            return;
        }

        setIsSubmitting(true);
        try {
            await hostApi.updateListing(id, formData);
            alert(`✅ Update successful!`);
            router.push('/host');
        } catch (error: any) {
            alert(error.message || 'Update failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 4. Amenities Logic
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
            e.preventDefault();
            addAmenity();
        }
    };

    if (isLoading) return <div className="p-10 text-center">Loading data...</div>;

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Edit Listing</h1>
                <div className="text-gray-500 text-sm">ID: {id}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. BASIC INFORMATION */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1">Property Type</label>
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
                            <label className="block text-sm font-bold mb-1">Area (City, State)</label>
                            <input 
                                type="text"
                                className={`w-full border p-3 rounded-lg ${errors.city ? 'border-red-500' : ''}`}
                                value={formData.city} 
                                onChange={e => {
                                    setFormData({ ...formData, city: e.target.value });
                                    if(errors.city) setErrors({...errors, city: ''});
                                }}
                            />
                            <p className="text-xs text-gray-500 mt-1">Ex: LA, California</p>
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                    </div>
                </div>

                {/* 2. DETAILS */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Details</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Title</label>
                            <input 
                                type="text" 
                                className={`w-full border p-3 rounded-lg ${errors.title ? 'border-red-500' : ''}`}
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
                                value={formData.description} 
                                onChange={e => setFormData({ ...formData, description: e.target.value })} 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Price / Night ($)</label>
                                <input 
                                    type="number" 
                                    className={`w-full border p-3 rounded-lg ${errors.pricePerNight ? 'border-red-500' : ''}`}
                                    value={formData.pricePerNight} 
                                    onChange={e => {
                                        setFormData({ ...formData, pricePerNight: Number(e.target.value) });
                                        if(errors.pricePerNight) setErrors({...errors, pricePerNight: ''});
                                    }} 
                                />
                                {errors.pricePerNight && <p className="text-red-500 text-xs mt-1">{errors.pricePerNight}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Max Guests</label>
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
                                <input 
                                    type="number" min="0" 
                                    className="w-full border p-2 rounded-lg" 
                                    value={formData.numBedrooms} 
                                    onChange={e => setFormData({ ...formData, numBedrooms: Number(e.target.value) })} 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Beds</label>
                                <input 
                                    type="number" min="0" 
                                    className="w-full border p-2 rounded-lg" 
                                    value={formData.numBeds} 
                                    onChange={e => setFormData({ ...formData, numBeds: Number(e.target.value) })} 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Bathrooms</label>
                                <input 
                                    type="number" min="0" 
                                    className="w-full border p-2 rounded-lg" 
                                    value={formData.numBathrooms} 
                                    onChange={e => setFormData({ ...formData, numBathrooms: Number(e.target.value) })} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. AMENITIES */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Amenities</h2>
                    
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
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((item, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-gray-300">
                                {item}
                                <button 
                                    type="button" 
                                    onClick={() => removeAmenity(item)}
                                    className="text-gray-400 hover:text-red-500 font-bold ml-1"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        {formData.amenities.length === 0 && <span className="text-gray-400 italic text-sm">No amenities added.</span>}
                    </div>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white p-4 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
                    <Link 
                        href="/host" 
                        className="px-6 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition"
                    >
                        Cancel
                    </Link>
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="flex-1 bg-rose-600 text-white font-bold py-3 rounded-lg hover:bg-rose-700 transition disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </form>
        </div>
    );
}