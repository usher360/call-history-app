import {HistoryCallModel} from "../models/index.mjs";
import {STATUS_INTERNAL_SERVER_ERROR, STATUS_SUCCESS} from "../utils/const.mjs";
import {ContactModel} from "../models/contact-model.mjs";

export async function getHistoryCall(req, res) {
    try {
        const result = await HistoryCallModel.getHistoryCall();
        res.status(STATUS_SUCCESS).json(result);
    } catch (err) {
        res.status(STATUS_INTERNAL_SERVER_ERROR);
    }
}

export async function addHistoryCall(req, res) {
    try {
        await HistoryCallModel.addHistoryCall(req.body?.phoneNumber, req.body?.timestamp);
        res.status(STATUS_SUCCESS).send("history call added");
    } catch (err) {
        res.status(STATUS_INTERNAL_SERVER_ERROR);
    }
}

export async function deleteHistoryCall(req, res) {
    try {
        await HistoryCallModel.deleteHistoryCall(req.params?.id);
        res.status(STATUS_SUCCESS).send("history call deleted");
    } catch (err) {
        res.status(STATUS_INTERNAL_SERVER_ERROR);
    }
}

export async function getContact(req, res) {
    try {
        const result = await ContactModel.getContact();
        res.status(STATUS_SUCCESS).json(result);
    } catch (err) {
        res.status(STATUS_INTERNAL_SERVER_ERROR);
    }
}

export async function addContact(req, res) {
    try {
        await ContactModel.addContact(req.body?.phoneNumber, req.body?.fullName);
        res.status(STATUS_SUCCESS).send("history call added");
    } catch (err) {
        res.status(STATUS_INTERNAL_SERVER_ERROR);
    }
}

export async function deleteContact(req, res) {
    try {
        await ContactModel.deleteContact(req.params?.id);
        res.status(STATUS_SUCCESS).send("history call deleted");
    } catch (err) {
        res.status(STATUS_INTERNAL_SERVER_ERROR);
    }
}