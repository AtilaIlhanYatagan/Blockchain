import axios from "axios";
import { BlockData } from "./fetchLatestHash";

export const fetchBlockWithId = async (blockId: string): Promise<BlockData> => {
    try {
        const response = await axios.get(`https://chain.api.btc.com/v3/block/${blockId}`);
        const blockData = response.data.data;
        console.log(blockData);
        return blockData;
    } catch (error) {
        console.error('Error fetching latest hash:', error);
        throw error; // Re-throw the error so that the caller can handle it if needed
    }
};
