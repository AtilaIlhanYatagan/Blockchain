// api.ts
import axios from 'axios';

export interface BlockData {
    height: number;
    version: number;
    mrkl_root: string;
    timestamp: number;
    bits: number;
    nonce: number;
    hash: string;
    prev_block_hash: string;
    next_block_hash: string;
    size: number;
    pool_difficulty: number;
    difficulty: number;
    difficulty_double: number;
    tx_count: number;
    reward_block: number;
    reward_fees: number;
    confirmations: number;
    is_orphan: boolean;
    curr_max_timestamp: number;
    is_sw_block: boolean;
    stripped_size: number;
    sigops: number;
    weight: number;
  }
  
export const fetchLatestBlock = async (): Promise<BlockData> => {
    try {
        const response = await axios.get('https://chain.api.btc.com/v3/block/latest');
        // Accessing the weight field within the data object
        const weight = response.data.data;
        
        console.log(weight);
        return weight;
    } catch (error) {
        console.error('Error fetching latest hash:', error);
        throw error; // Re-throw the error so that the caller can handle it if needed
    }
};
