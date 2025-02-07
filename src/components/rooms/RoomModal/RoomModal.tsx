// components/rooms/RoomModal/RoomModal.tsx
import { useHotelContext } from '../../../context/HotelContext';
import { formatCurrency } from '../../../utils/FormatDateTime_hhMM.ts';

const RoomModal = () => {
  const { selectedRoom, isModalOpen, setIsModalOpen } = useHotelContext();
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  if (!isModalOpen || !selectedRoom) return null;

  const imageUrl = selectedRoom.attributes.img?.data?.attributes?.formats?.large?.url || '/fallback-room-image.jpg';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Room {selectedRoom.attributes.room_number}</h2>
            <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
              ×
            </button>
          </div>
          <img src={imageUrl} alt={`Room ${selectedRoom.attributes.room_number}`} className="w-full h-64 object-cover rounded-lg mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Room Details</h3>
              <ul className="space-y-2">
                <li>Floor: {selectedRoom.attributes.floor}</li>
                <li>Status: {selectedRoom.attributes.room_status}</li>
                <li>Price: {formatCurrency(selectedRoom.attributes.price_per_night)}/night</li>
              </ul>
            </div>
            {/* Add booking form here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
