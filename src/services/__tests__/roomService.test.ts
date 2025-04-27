import { createRooms } from "../roomService";
import { RoomStatus } from "../../types/room";
import MockAdapter from "axios-mock-adapter";
import { api } from "../roomService";

// Mock localStorage và sessionStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
Object.defineProperty(window, "sessionStorage", { value: mockSessionStorage });

// Tạo mock cho axios
const mock = new MockAdapter(api);

describe("Room Service - createRooms", () => {
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzQ1NzQwNzY1LCJleHAiOjE3NDgzMzI3NjV9.fZbAWmx5Yh39SaHgo3HFm5iuxRb8x25GQ2_cCfLXbeo";
  const mockRoomData = {
    room_number: 999,
    floor: 1,
    room_status: RoomStatus.Available,
    price_per_night: 100,
    first_hourly_price: 20,
    after_hour_price: 15,
    img: 52,
  };

  beforeEach(() => {
    // Reset mock trước mỗi test
    mock.reset();
    jest.clearAllMocks();
    // Mock token trong localStorage
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({ jwt: mockToken })
    );
  });

  it("should throw error when token is missing and API returns 403", async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    mockSessionStorage.getItem.mockReturnValue(null);

    mock.onPost("/rooms").reply(403, {
      data: null,
      error: {
        status: 403,
        name: "ForbiddenError",
        message: "Forbidden",
        details: {},
      },
    });

    await expect(createRooms(mockRoomData)).rejects.toThrow(
      "Error when create room"
    );
  });

  it("should create a room successfully", async () => {
    const mockResponse = { data: mockRoomData };
    mock.onPost("/rooms").reply(201, mockResponse);

    const result = await createRooms(mockRoomData);
    expect(result).toEqual(mockResponse);
  });

  it("should send correct payload to API", async () => {
    const mockResponse = { data: mockRoomData };
    mock.onPost("/rooms").reply(201, mockResponse);

    await createRooms(mockRoomData);
    const requestData = JSON.parse(mock.history.post[0].data);
    expect(requestData).toEqual({ data: mockRoomData });
  });
});
