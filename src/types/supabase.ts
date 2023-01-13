type WatchAddressPayload = {
  commit_timestamp: string; // '2023-01-13T15:36:49Z';
  errors: null;
  eventType: 'UPDATE';
  new: {
    address: string; // '0x165CD37b4C644C2921454429E7F9358d18A45e14';
    asset_id: string; // '38975bff-987f-4a06-b488-c75177e06914';
    block_height: number;
    confirmations_to_watch: number;
    created: string; // '2023-01-13T15:36:11.086';
    id: string; // '650b5833-1a98-4d30-bbfd-922c077bb400';
    memo: null;
    network_code: string; // 'goerli';
    organization_id: string; // '01d53f71-e299-4521-a45b-6a8909d3c0d5';
    state: 'confirming' | 'pending' | 'confirmed';
    subscribed: true;
    tx_amount: string; // '5000000000000';
    tx_block_hash: string; // '0x1705f2930e2de09d0394f76b946b067115f14e8144bb3e3f077be618fd11436e';
    tx_block_height: number;
    tx_confirmations: number;
    tx_data: string; // '0x';
    tx_detected_at: string; // '2023-01-13T15:36:27.722';
    tx_formatted_amount: string; // '0.005';
    tx_id: string; // '0x1fc77a32a90a7f885c5141692ecf7d89a963ea8db0abd5a9debb00fb473b948f';
    updated: string; // '2023-01-13T15:36:49.281';
    user_id: string; // 'preview-user-id';
  };
  old: {
    id: '650b5833-1a98-4d30-bbfd-922c077bb400';
  };
  schema: 'public';
  table: 'watched_address';
};
