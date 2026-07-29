import { useEffect, useState } from "react";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../services/addressService";

const emptyForm = {
  title: "",
  recipientName: "",
  recipientPhone: "",
  deliveryMethod: "branch",
  novaPoshtaCity: "",
  novaPoshtaWarehouse: "",
};

const deliveryLabels = {
  branch: "Нова Пошта — відділення",
  postomat: "Нова Пошта — поштомат",
  courier: "Кур'єр",
};

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const isAuthenticated = !!localStorage.getItem("token");

  const loadAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data);
    } catch (err) {
      console.error("Помилка завантаження адрес:", err);
      setError("Не вдалося завантажити адреси.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAddresses();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openNewForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormOpen(true);
  };

  const openEditForm = (address) => {
    setForm({
      title: address.title || "",
      recipientName: address.recipientName || "",
      recipientPhone: address.recipientPhone || "",
      deliveryMethod: address.deliveryMethod || "branch",
      novaPoshtaCity: address.novaPoshtaCity || "",
      novaPoshtaWarehouse: address.novaPoshtaWarehouse || "",
    });
    setEditingId(address.id);
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAddress(editingId, form);
      } else {
        await createAddress(form);
      }
      setFormOpen(false);
      setForm(emptyForm);
      setEditingId(null);
      await loadAddresses();
    } catch (err) {
      console.error("Помилка збереження адреси:", err);
      setError("Не вдалося зберегти адресу.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);
      await loadAddresses();
    } catch (err) {
      console.error("Помилка видалення адреси:", err);
      setError("Не вдалося видалити адресу.");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const currentDefault = addresses.find((a) => a.isDefault && a.id !== id);
      if (currentDefault) {
        await updateAddress(currentDefault.id, { isDefault: false });
      }
      await updateAddress(id, { isDefault: true });
      await loadAddresses();
    } catch (err) {
      console.error("Помилка встановлення основної адреси:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Мої адреси</h2>
        <p>Увійдіть в акаунт, щоб зберігати адреси доставки.</p>
      </div>
    );
  }

  if (loading) return <p>Завантаження...</p>;

  return (
    <div>
      <h2>Мої адреси</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {addresses.length === 0 && !formOpen && (
        <p>У вас ще немає збережених адрес.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        {addresses.map((address) => (
          <div
            key={address.id}
            style={{
              border: address.isDefault ? "2px solid #0275d8" : "1px solid #ddd",
              borderRadius: "6px",
              padding: "12px 15px",
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {address.title || "Адреса"} {address.isDefault && "★ (основна)"}
            </p>
            <p style={{ margin: "4px 0" }}>{address.recipientName}, {address.recipientPhone}</p>
            <p style={{ margin: "4px 0" }}>
              {deliveryLabels[address.deliveryMethod] || address.deliveryMethod}
              {address.novaPoshtaCity ? `, ${address.novaPoshtaCity}` : ""}
              {address.novaPoshtaWarehouse ? `, ${address.novaPoshtaWarehouse}` : ""}
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              {!address.isDefault && (
                <button type="button" onClick={() => handleSetDefault(address.id)}>
                  Зробити основною
                </button>
              )}
              <button type="button" onClick={() => openEditForm(address)}>
                Редагувати
              </button>
              <button type="button" onClick={() => handleDelete(address.id)}>
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>

      {!formOpen ? (
        <button type="button" onClick={openNewForm}>
          + Додати адресу
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}
        >
          <div>
            <label>Назва (наприклад "Дім", "Робота")</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label>Ім'я одержувача</label>
            <input
              type="text"
              name="recipientName"
              value={form.recipientName}
              onChange={handleChange}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label>Телефон</label>
            <input
              type="tel"
              name="recipientPhone"
              value={form.recipientPhone}
              onChange={handleChange}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label>Спосіб доставки</label>
            <select
              name="deliveryMethod"
              value={form.deliveryMethod}
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              <option value="branch">Нова Пошта — відділення</option>
              <option value="postomat">Нова Пошта — поштомат</option>
              <option value="courier">Кур'єр</option>
            </select>
          </div>
          <div>
            <label>Місто</label>
            <input
              type="text"
              name="novaPoshtaCity"
              value={form.novaPoshtaCity}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label>Відділення / номер поштомату</label>
            <input
              type="text"
              name="novaPoshtaWarehouse"
              value={form.novaPoshtaWarehouse}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit">Зберегти</button>
            <button
              type="button"
              onClick={() => {
                setFormOpen(false);
                setEditingId(null);
              }}
            >
              Скасувати
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressesPage;
