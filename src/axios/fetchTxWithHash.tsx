import axios from "axios";

interface PrevOut {
  hash: string;
  value: string;
  tx_index: string;
  n: string;
}

interface Input {
  prev_out: PrevOut;
  script: string;
}

interface Out {
  value: string;
  hash: string;
  script: string;
}

interface RawTx {
  hash: string;
  ver: number;
  vin_sz: number;
  vout_sz: number;
  lock_time: string;
  size: number;
  relayed_by: string;
  block_height: number;
  tx_index: string;
  inputs: Input[];
  out: Out[];
}

export const fetchBlockWithId = async (txHash: string): Promise<RawTx> => {
    try {
        const response = await axios.get(`https://blockchain.info/rawtx/${txHash}`);
        const blockData = response.data.data;
        console.log(blockData);
        return blockData;
    } catch (error) {
        console.error('Error fetching latest hash:', error);
        throw error; // Re-throw the error so that the caller can handle it if needed
    }
};
