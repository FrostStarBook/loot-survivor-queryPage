import { hexStrArrToStr, toAddress } from './utils';
import { v4 as uuidv4 } from 'uuid';
import type { CheckpointWriter } from '@snapshot-labs/checkpoint';

export async function handleDeploy() {
  // Run logic as at the time Contract was deployed.
}

// This decodes the new_post events data and stores successfully
// decoded information in the `posts` table.
//
// See here for the original logic used to create post transactions:
// https://gist.github.com/perfectmak/417a4dab69243c517654195edf100ef9#file-index-ts
function processEventData(eventData: any[]): bigint[] {
  return eventData.map(data => BigInt(data));
}

async function insertIntoDatabase(tableName: string, data: any, mysql: any) {
  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync(`INSERT IGNORE INTO ${tableName} SET ?`, [data]);
}

function createDataObject(keys: string[], values: bigint[], tx: any, block: any): any {
  const dataObject: any = {
    id: uuidv4(),
    tx_hash: tx.transaction_hash,
    created_at: block.timestamp,
    created_at_block: block.block_number
  };

  keys.forEach((key, index) => {
    dataObject[key] = values[index];
  });

  return dataObject;
}

function hexToString(hex: string): string {
  let result = '';
  let i = 0;

  if (hex.length % 2 !== 0) {
    throw new Error('Hex string length must be even.');
  }

  while (i < hex.length) {
    const byte = parseInt(hex.substr(i, 2), 16);
    result += String.fromCharCode(byte);
    i += 2;
  }

  return result;
}

function createCharacterData(eventData: any[], additionalData: any = {}): any {
  const characterData = {
    id: uuidv4(),
    owner: toAddress(eventData[0]),
    adventurer_id: BigInt(eventData[1]),
    no_message: BigInt(eventData[2]),
    last_action: BigInt(eventData[3]),
    health: BigInt(eventData[4]),
    xp: BigInt(eventData[5]),
    strength: BigInt(eventData[6]),
    dexterity: BigInt(eventData[7]),
    vitality: BigInt(eventData[8]),
    intelligence: BigInt(eventData[9]),
    wisdom: BigInt(eventData[10]),
    charisma: BigInt(eventData[11]),
    luck: BigInt(eventData[12]),
    gold: BigInt(eventData[13]),
    weapon_id: BigInt(eventData[14]),
    weapon_xp: BigInt(eventData[15]),
    weapon_metadata: BigInt(eventData[16]),
    chest_id: BigInt(eventData[17]),
    chest_xp: BigInt(eventData[18]),
    chest_metadata: BigInt(eventData[19]),
    head_id: BigInt(eventData[20]),
    head_xp: BigInt(eventData[21]),
    head_metadata: BigInt(eventData[22]),
    waist_id: BigInt(eventData[23]),
    waist_xp: BigInt(eventData[24]),
    waist_metadata: BigInt(eventData[25]),
    foot_id: BigInt(eventData[26]),
    foot_xp: BigInt(eventData[27]),
    foot_metadata: BigInt(eventData[28]),
    hand_id: BigInt(eventData[29]),
    hand_xp: BigInt(eventData[30]),
    hand_metadata: BigInt(eventData[31]),
    neck_id: BigInt(eventData[32]),
    neck_xp: BigInt(eventData[33]),
    neck_metadata: BigInt(eventData[34]),
    ring_id: BigInt(eventData[35]),
    ring_xp: BigInt(eventData[36]),
    ring_metadata: BigInt(eventData[37]),
    beast_health: BigInt(eventData[38]),
    stat_points_available: BigInt(eventData[39]),
    mutated: BigInt(eventData[40]),
    ...additionalData
  };

  return characterData;
}

export async function startGame({ block, tx, event, mysql }: Parameters<CheckpointWriter>[0]) {
  if (!event) return;

  const additionalData = {
    name: event.data[41],
    home_realm: BigInt(event.data[42]),
    clazz: BigInt(event.data[43]),
    entropy: BigInt(event.data[44]),
    tx_hash: tx.transaction_hash,
    created_at: block.timestamp,
    created_at_block: block.block_number
  };

  const startGameData = createCharacterData(event.data, additionalData);

  try {
    await insertIntoDatabase('startgames', startGameData, mysql);
  } catch (error) {
    console.error(`Error inserting into database startgames: ${error}`);
  }
}

export async function slayedBeast({ block, tx, event, mysql }: Parameters<CheckpointWriter>[0]) {
  if (!event) return;

  const additionalData = {
    seed: BigInt(event.data[41]),
    slayed_beast_id: BigInt(event.data[42]),
    tier: BigInt(event.data[43]),
    item_type: BigInt(event.data[44]),
    level: BigInt(event.data[45]),
    special1: BigInt(event.data[46]),
    special2: BigInt(event.data[47]),
    special3: BigInt(event.data[48]),
    damage_dealt: BigInt(event.data[49]),
    critical_hit: BigInt(event.data[50]),
    xp_earned_adventurer: BigInt(event.data[51]),
    xp_earned_items: BigInt(event.data[52]),
    gold_earned: BigInt(event.data[53]),
    tx_hash: tx.transaction_hash,
    created_at: block.timestamp,
    created_at_block: block.block_number
  };

  const slayedBeastData = createCharacterData(event.data, additionalData);

  try {
    await insertIntoDatabase('slayedbeasts', slayedBeastData, mysql);
  } catch (error) {
    console.error(`Error inserting into database slayedbeasts: ${error}`);
  }
}

export async function rewardDistribution({
  block,
  tx,
  event,
  mysql
}: Parameters<CheckpointWriter>[0]) {
  if (!event) return;
  const keys = [
    'first_place_adventurer_id',
    'first_place_no_message',
    'first_place_rank',
    'first_place_amount',
    'first_place_no_message_2',
    'first_place_address',
    'second_place_adventurer_id',
    'second_place_no_message',
    'second_place_rank',
    'second_place_amount',
    'second_place_no_message_2',
    'second_place_address',
    'third_place_adventurer_id',
    'third_place_no_message',
    'third_place_rank',
    'third_place_amount',
    'third_place_no_message_2',
    'third_place_address',
    'client_amount',
    'client_no_message',
    'client_address',
    'dao',
    'no_message'
  ];
  const values = processEventData(event.data);

  const rewardDistribution = createDataObject(keys, values, tx, block);

  try {
    await insertIntoDatabase('rewarddistributions', rewardDistribution, mysql);
  } catch (error) {
    console.error(`Error inserting into database rewarddistributions: ${error}`);
  }

}

export async function adventurerLeveledUp({
  block,
  tx,
  event,
  mysql
}: Parameters<CheckpointWriter>[0]) {
  if (!event) return;

  const additionalData = {
    previous_level: BigInt(event.data[41]),
    new_level: BigInt(event.data[42]),
    tx_hash: tx.transaction_hash,
    created_at: block.timestamp,
    created_at_block: block.block_number
  };

  const adventurerLeveledUp = createCharacterData(event.data, additionalData);

  try {
    await insertIntoDatabase('adventurerleveledups', adventurerLeveledUp, mysql);
  } catch (error) {
    console.error(`Error inserting into database adventurerleveledups: ${error}`);
  }
}

export async function upgradesAvailable({
  block,
  tx,
  event,
  mysql
}: Parameters<CheckpointWriter>[0]) {
  if (!event) return;

  const temp_items: bigint[] = [];
  for (let i = 42; i < event.data.length; i++) {
    temp_items.push(BigInt(event.data[i]));
  }
  const items = temp_items.map(item => item.toString()).join();
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  const upgradesAvailable = createCharacterData(event.data, {
    items: items,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber
  });

  try {
    await insertIntoDatabase('upgradesavailables', upgradesAvailable, mysql);
  } catch (error) {
    console.error(`Error inserting into database upgradesavailables: ${error}`);
  }
}

export async function discoveredHealth({
  block,
  tx,
  event,
  mysql
}: Parameters<CheckpointWriter>[0]) {
  if (!event) return;

  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  const discoveredHealth = createCharacterData(event.data, {
    amount: BigInt(event.data[41]),
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber
  });

  try {
    await insertIntoDatabase('discoveredhealths', discoveredHealth, mysql);
  } catch (error) {
    console.error(`Error inserting into database discoveredhealths: ${error}`);
  }
}
