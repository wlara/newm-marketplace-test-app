
import { getRecaptchaHeaders } from "./recaptcha";

const BASE_URL = "http://localhost:3939"

export const generateSaleStartAmount = async (ownerAddress, bundlePolicyId, bundleAssetName, bundleAmount, costAmount, totalBundleQuantity) => {
    try {
        const recaptchaHeaders = await getRecaptchaHeaders("generate_sale_start_amount")
        const response = await fetch(`${BASE_URL}/v1/marketplace/sales/start/amount`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...recaptchaHeaders
            },
            body: JSON.stringify({
                ownerAddress,
                bundlePolicyId,
                bundleAssetName,
                bundleAmount,
                costAmount,
                totalBundleQuantity
            }),
        });
        checkResponse(response)
        return await response.json();
    } catch (error) {
        console.error("Error generating sale start amount:", error)
        throw error;
    }
};

export const generateSaleStartTransaction = async (saleId, changeAddress, utxos) => {
    try {
        const recaptchaHeaders = await getRecaptchaHeaders("generate_sale_start_transaction")
        const response = await fetch(`${BASE_URL}/v1/marketplace/sales/start/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...recaptchaHeaders
            },
            body: JSON.stringify({
                saleId,
                changeAddress,
                utxoCborHexList: utxos
            }),
        });
        checkResponse(response)
        return await response.json()
    } catch (error) {
        console.error("Error generating sale start transaction:", error)
        throw error;
    }
};

export const generateSaleEndAmount = async (saleId) => {
    try {
        const recaptchaHeaders = await getRecaptchaHeaders("generate_sale_end_amount")
        const response = await fetch(`${BASE_URL}/v1/marketplace/sales/end/amount`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...recaptchaHeaders
            },
            body: JSON.stringify({
                saleId
            }),
        });
        checkResponse(response)
        return await response.json();
    } catch (error) {
        console.error("Error generating sale end amount:", error)
        throw error;
    }
};

export const generateSaleEndTransaction = async (saleId, changeAddress, utxos) => {
    try {
        const recaptchaHeaders = await getRecaptchaHeaders("generate_sale_end_transaction")
        const response = await fetch(`${BASE_URL}/v1/marketplace/sales/end/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...recaptchaHeaders
            },
            body: JSON.stringify({
                saleId,
                changeAddress,
                utxoCborHexList: utxos
            }),
        });
        checkResponse(response)
        return await response.json()
    } catch (error) {
        console.error("Error generating sale end transaction:", error)
        throw error;
    }
};

export const generateOrderAmount = async (saleId, bundleQuantity) => {
    try {
        const recaptchaHeaders = await getRecaptchaHeaders("generate_order_amount")
        const response = await fetch(`${BASE_URL}/v1/marketplace/orders/amount`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...recaptchaHeaders
            },
            body: JSON.stringify({
                saleId,
                bundleQuantity
            }),
        });
        checkResponse(response)
        return await response.json();
    } catch (error) {
        console.error("Error generating order amount:", error)
        throw error;
    }
};

export const generateOrderTransaction = async (orderId, changeAddress, utxos) => {
    try {
        const recaptchaHeaders = await getRecaptchaHeaders("generate_order_transaction")
        const response = await fetch(`${BASE_URL}/v1/marketplace/orders/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...recaptchaHeaders
            },
            body: JSON.stringify({
                orderId,
                changeAddress,
                utxoCborHexList: utxos
            }),
        });
        checkResponse(response)
        return await response.json()
    } catch (error) {
        console.error("Error generating order transaction:", error)
        throw error;
    }
};

const checkResponse = (response) => {
    if (!response.ok) {
        const error = new Error(`HTTP status code: ${response.status}`)
        error.response = response
        error.status = response.status
        throw error
    }
}
