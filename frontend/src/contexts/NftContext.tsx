import { createContext, useState, ReactNode, useEffect } from "react";

// Define types
interface NftContextTypeProps {
  allNfts: any[];
  loading: boolean;
}

type NftContextProviderProps = {
  children: ReactNode;
};

// Create context with default values
export const NftContext = createContext<NftContextTypeProps>({
  allNfts: [],
  loading: true,
});

const NftContextProvider = ({ children }: NftContextProviderProps) => {
  const [allNfts, setAllNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const nftContracts = [
    { platform: "ethereum", address: "0xd4e4078ca3495de5b1d4db434bebc5a986197782" }, 
    { platform: "ethereum", address: "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d" },  
    { platform: "ethereum", address: "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7" }, 
    { platform: "ethereum", address: "0xc3f733ca98e0dad0386979eb96fb1722a1a05e69" }, 
    { platform: "ethereum", address: "0xccdf1373040d9ca4b5be1392d1945c1dae4a862c" }, 
    { platform: "ethereum", address: "0x78a5e2b8c280fa5580fbe1e1ed546183f959d305" }, 
    { platform: "ethereum", address: "0x123b30e25973fecd8354dd5f41cc45a3065ef88c" },
    { platform: "ethereum", address: "0x9cf0ab1cc434db83097b7e9c831a764481dec747" }, 
    { platform: "ethereum", address: "0x77372a4cc66063575b05b44481f059be356964a4" }, 
    { platform: "ethereum", address: "0xc374a204334d4edd4c6a62f0867c752d65e9579c" }, 
];

  const fetchNFTCollections = async () => {
    const apiKey = import.meta.env.VITE_COIN_GECKO_API_KEY;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    };

    try {
      setLoading(true);
      const responses = await Promise.all(
        nftContracts.map(({ platform, address }) =>
          fetch(`https://api.coingecko.com/api/v3/nfts/${platform}/contract/${address}`, options)
        )
      );

      const data = await Promise.all(responses.map((res) => res.json()));
      setAllNfts(data);
    } catch (err) {
      console.error("Error fetching NFT data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Optionally, call fetchNFTCollections on mount
  useEffect(() => {
  fetchNFTCollections();
}, []);

useEffect(() => {
  console.log("Fetched NFTs:", allNfts);
}, [allNfts]);

  const contextValue: NftContextTypeProps = {
    allNfts,
    loading,
  };

  return <NftContext.Provider value={contextValue}>{children}</NftContext.Provider>;
};

export default NftContextProvider;
