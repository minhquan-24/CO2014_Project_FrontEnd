'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userApi } from '@/app/service/api'; 

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

   const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    nationality: '',
    birthDate: '',
    bankAccount: '',
    ssn: '',
    taxId: '',
    responseTime: '',
    preferredPayment: '',
    travelInterests: ''
  });

  const fetchProfile = async () => {
    try {
      const data = await userApi.getProfile();
      setUser(data);
      const host = data.hostDetails || {};
      const guest = data.guestDetails || {};

      setFormData({
        name: data.Name || '',
        phoneNumber: data.PhoneNumber || '',
        nationality: data.Nationality || '',
        birthDate: data.BirthDate ? data.BirthDate.split('T')[0] : '',
        bankAccount: data.Bank_Account || '',
        ssn: data.SSN || '',

        taxId: host.Tax_ID || '',
        responseTime: host.Response_Time || '',

        preferredPayment: guest.Preferred_Payment || '',
        travelInterests: guest.Travel_Interests || ''
      });
    } catch (error) {
      console.error("Lỗi lấy profile", error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userApi.updateProfile(formData);
      alert("Successful update!");
      setIsEditModalOpen(false);
      fetchProfile();
      
      const lsUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...lsUser, name: formData.name }));
      
    } catch (error) {
      alert("Update failed, please try again.");
    }
  };

   if (loading) return <div className="p-10 text-center">Loading profile...</div>;
   if (!user) return null;
    const isHost = user.role === 'HOST';

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My profile</h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
        
        <div className="flex-shrink-0">
           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner">
              <img 
                src={user.avatar || "https://i.pravatar.cc/150?img=32"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
           </div>
        </div>

         <div className="flex-1 flex flex-col justify-between w-full">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <InfoField label="Full name" value={user.Name} />
            <InfoField label="Email" value={user.Email} />
            <InfoField label="Phone number" value={user.PhoneNumber || 'Not updated'} />
            <InfoField label="Nationality" value={user.Nationality || 'Not updated'} />
            <InfoField label="Birthday" value={user.BirthDate ? new Date(user.BirthDate).toLocaleDateString() : 'Not updated'} />
            <InfoField label="SSN" value={user.SSN || 'Not updated'} />
            <InfoField label="Bank Account" value={user.Bank_Account || 'Not updated'} />
         </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isHost ? (
                <>
                  <InfoField label="Tax Number" value={user.hostDetails?.Tax_ID || 'Not updated'} />
                  <InfoField label="Response Time" value={user.hostDetails?.Response_Time || 'Not updated'} />
                </>
              ) : (
                <>
                   <InfoField label="Preferred Payment" value={user.guestDetails?.Preferred_Payment || 'Not updated'} />
                   <InfoField label="Travel Interest" value={user.guestDetails?.Travel_Interests || 'Not updated'} />
                </>
              )}
           </div>

         <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-3">
               <Badge label="Role" value={user.role} color="blue" />
               <Badge label="ID" value={user.User_ID} color="gray" />
            </div>
            <button 
               onClick={() => setIsEditModalOpen(true)}
               className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition shadow-sm active:scale-95"
            >
            Edit profile
            </button>
         </div>
      </div>
   </div>


      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">Edit profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <InputGroup label="Full name" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
              
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Phone number" value={formData.phoneNumber} onChange={v => setFormData({...formData, phoneNumber: v})} />
                <InputGroup label="Birthday" type="date" value={formData.birthDate} onChange={v => setFormData({...formData, birthDate: v})} />
              </div>
              
              <InputGroup label="Nationality" value={formData.nationality} onChange={v => setFormData({...formData, nationality: v})} />

              <div className="grid grid-cols-2 gap-4">
                 <InputGroup label="SSN" value={formData.ssn} onChange={v => setFormData({...formData, ssn: v})} />
                 <InputGroup label="Bank Account" value={formData.bankAccount} onChange={v => setFormData({...formData, bankAccount: v})} />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-bold text-sm uppercase text-gray-500">Infomation {isHost ? 'Host' : 'Guest'}</h4>
                  {isHost ? (
                    <>
                        <InputGroup label="Tax Number" value={formData.taxId} onChange={v => setFormData({...formData, taxId: v})} />
                        <div>
                             <label className="block text-sm font-bold text-gray-700 mb-1">Response time</label>
                             <select 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                                value={formData.responseTime}
                                onChange={(e) => setFormData({...formData, responseTime: e.target.value})}
                             >
                                <option value="within an hour">within an hour</option>
                                <option value="within a few hours">within a few hours</option>
                                <option value="within a day">within a day</option>
                                <option value="a few days or more">a few days or more</option>
                             </select>
                        </div>
                    </>
                  ) : (
                    <>
                        <div>
                             <label className="block text-sm font-bold text-gray-700 mb-1">Preferred Payment</label>
                             <select 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                                value={formData.preferredPayment}
                                onChange={(e) => setFormData({...formData, preferredPayment: e.target.value})}
                             >
                                <option value="Cash">Cash</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                             </select>
                        </div>
                        <InputGroup label="Travel Interest" value={formData.travelInterests} onChange={v => setFormData({...formData, travelInterests: v})} />
                    </>
                  )}
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-100 transition">Clear</button>
                <button type="submit" className="flex-1 py-3 rounded-lg font-bold text-white bg-rose-600 hover:bg-rose-700 transition">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const InfoField = ({ label, value }: { label: string, value: string }) => (
  <div>
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">{label}</label>
    <p className="text-gray-900 font-medium">{value}</p>
  </div>
);

const Badge = ({ label, value, color }: { label: string, value: string, color: string }) => {
  const colorClass = color === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
  return (
    <div>
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mr-2">{label}</label>
      <span className={`text-sm font-bold px-3 py-1 rounded-full ${colorClass}`}>
        {value}
      </span>
    </div>
  );
}

const InputGroup = ({ label, value, onChange, type = "text" }: any) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
        <input 
          type={type}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
