const PROFILE_DATA_KEY = "profile";

class ProfileForm {
  data = null;

  constructor(sotrage, root) {
    this.storage = sotrage;
    this.root = root;
  }

  onProfileSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(this.data));
    console.log({ ...this.data });
    this.clearForm();
    this.saveProfileData();
  };

  getFormDataObject = (form) => {
    return Object.fromEntries(new FormData(form).entries());
  };

  clearForm = () => {
    this.setData(
      Object.fromEntries(
        Object.entries(this.data).map(([key, val]) => [key, null])
      )
    );
  };

  retrieveProfileData = () => {
    const storedFormData = this.storage.getData(PROFILE_DATA_KEY);
    if (!storedFormData) {
      const restoredData = this.getFormDataObject();
      this.setData(restoredData);
    } else {
      this.setData(storedFormData);
    }
  };

  setData = (data) => {
    this.data = data;
    console.log(data);
    [...this.root.profileFormInputs].forEach((input) => {
      if (this.data[input.name] === undefined) {
        return;
      }
      if (input.type == "radio") {
        input.checked = input.value === this.data[input.name];
      } else if (input.type == "checkbox") {
        input.checked = !!this.data[input.name];
      } else {
        input.value = this.data[input.name];
      }
    });
  };

  onChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.data[name] = type === "checkbox" ? checked : value;
    this.saveProfileData();
  };

  saveProfileData = () => {
    this.storage.setData(PROFILE_DATA_KEY, this.data);
  };

  init() {
    this.retrieveProfileData();
    this.setSubmitListener();
    this.setInputListener();
  }

  setSubmitListener = () => {
    this.root.profileForm.addEventListener("submit", this.onProfileSubmit);
  };

  setInputListener = () => {
    this.root.profileFormInputs.forEach((inputNode) =>
      inputNode.addEventListener("input", this.onChange)
    );
  };
}
export default ProfileForm;
