export default interface UpdateInfor {
  nickName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: number;
  address: string;
  phoneNumber: string;
  description: string;
}

export const defaultUpdateInfor: UpdateInfor = {
  nickName: "Default Nickname",
  firstName: "Default First Name",
  lastName: "Default Last Name",
  dateOfBirth: new Date().toISOString(), // Chuyển đổi ngày hiện tại sang định dạng ISO
  gender: 0, // Giá trị mặc định cho giới tính
  address: "Default Address",
  phoneNumber: "Default Phone Number",
  description: "Default Description",
};
