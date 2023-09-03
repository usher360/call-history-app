import {createServerAPI} from "./api";

export async function getHistoryCalls() {
    const res = await createServerAPI().get(`/history-call`);
    return res.data;
}

export async function addHistoryCall({phoneNumber, timestamp}) {
    const res = await createServerAPI().post(`/history-call`, {phoneNumber, timestamp});
    return res.data;
}

export async function deleteHistoryCall(id) {
    const res = await createServerAPI().delete(`/history-call/${id}`);
    return res.data;
}

export async function getContacts() {
    const res = await createServerAPI().get(`/contact`);
    return res.data;
}

export async function addContact({fullName, phoneNumber}) {
    const res = await createServerAPI().post(`/contact`, {fullName, phoneNumber});
    return res.data;
}

export async function deleteContact(id) {
    const res = await createServerAPI().delete(`/contact/${id}`);
    return res.data;
}