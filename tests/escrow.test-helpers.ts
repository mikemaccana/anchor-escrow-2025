import { Connection } from "solana-kite";
import { lamports, type KeyPairSigner, type Address } from "@solana/kit";
import * as programClient from "../dist/js-client";
import { OFFER_DISCRIMINATOR } from "../dist/js-client";
import bs58 from "bs58";
import { TOKEN_EXTENSIONS_PROGRAM } from "solana-kite";

// For debugging. You could delete these, but then someone else will have to recreate them and then they'll be annoyed with you.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const log = console.log;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stringify = (object: any) => {
  const bigIntReplacer = (key: string, value: any) => (typeof value === "bigint" ? value.toString() : value);
  return JSON.stringify(object, bigIntReplacer, 2);
};

export const ONE_SOL = lamports(1n * 1_000_000_000n);

export const getRandomBigInt = () => {
  return BigInt(Math.floor(Math.random() * 1_000_000_000_000_000_000));
};

// Helper function to create a test offer
export async function createTestOffer(params: {
  connection: Connection;
  maker: KeyPairSigner;
  tokenMintA: Address;
  tokenMintB: Address;
  makerTokenAccountA: Address;
  tokenAOfferedAmount: bigint;
  tokenBWantedAmount: bigint;
  offerId?: bigint;
}) {
  const {
    connection,
    maker,
    tokenMintA,
    tokenMintB,
    makerTokenAccountA,
    tokenAOfferedAmount,
    tokenBWantedAmount,
    offerId = getRandomBigInt(),
  } = params;

  const offerPDAAndBump = await connection.getPDAAndBump(programClient.ESCROW_PROGRAM_ADDRESS, ["offer", offerId]);
  const offer = offerPDAAndBump.pda;
  const vault = await connection.getTokenAccountAddress(offer, tokenMintA, true);

  const makeOfferInstruction = await programClient.getMakeOfferInstructionAsync({
    maker,
    tokenMintA,
    tokenMintB,
    makerTokenAccountA,
    offer,
    vault,
    id: offerId,
    tokenAOfferedAmount,
    tokenBWantedAmount,
    tokenProgram: TOKEN_EXTENSIONS_PROGRAM,
  });

  const signature = await connection.sendTransactionFromInstructions({
    feePayer: maker,
    instructions: [makeOfferInstruction],
  });

  return { offer, vault, offerId, signature };
}

export const getOffers = async (connection: Connection) => {
  const getProgramAccountsResults = await connection.rpc
    .getProgramAccounts(programClient.ESCROW_PROGRAM_ADDRESS, {
      encoding: "jsonParsed",
      filters: [
        {
          memcmp: {
            offset: 0,
            bytes: bs58.encode(Buffer.from(OFFER_DISCRIMINATOR)),
          },
        },
      ],
    })
    .send();
  const offerAddresses = getProgramAccountsResults.map((result: any) => result.pubkey);
  const fetchAllMaybeOfferAccounts = await programClient.fetchAllMaybeOffer(connection.rpc, offerAddresses);
  return fetchAllMaybeOfferAccounts;
};
