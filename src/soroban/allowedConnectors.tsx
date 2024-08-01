import { Connector } from "@soroban-react/types";
import { freighter } from "@soroban-react/freighter";
import { allowedChains as chains } from "./allowedChains";

export declare type ConnectorList = {
  groupName: string;
  connectors: Connector[];
}[];

export const allowedConnectors: ConnectorList = [
  {
    groupName: "My Group Name",
    connectors: [freighter()],
  },
];
