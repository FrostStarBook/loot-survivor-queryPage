import { hexStrArrToStr, toAddress } from './utils';
import type { CheckpointWriter } from '@snapshot-labs/checkpoint';

export async function handleDeploy() {
  // Run logic as at the time Contract was deployed.
}

// This decodes the new_post events data and stores successfully
// decoded information in the `posts` table.
//
// See here for the original logic used to create post transactions:
// https://gist.github.com/perfectmak/417a4dab69243c517654195edf100ef9#file-index-ts

export async function startGame({ block, tx, event, mysql }: Parameters<CheckpointWriter>[0]) {
  if (!event) return;
  console.log(event.data);

  const owner = toAddress(event.data[0]);
  const adventurer_id = BigInt(event.data[1]);
  const no_message = BigInt(event.data[2]);
  const last_action = BigInt(event.data[3]);
  const health = BigInt(event.data[4]);
  const xp = BigInt(event.data[5]);
  const strength = BigInt(event.data[6]);
  const dexterity = BigInt(event.data[7]);
  const vitality = BigInt(event.data[8]);
  const intelligence = BigInt(event.data[9]);
  const wisdom = BigInt(event.data[10]);
  const charisma = BigInt(event.data[11]);
  const luck = BigInt(event.data[12]);
  const gold = BigInt(event.data[13]);
  const weapon_id = BigInt(event.data[14]);
  const weapon_xp = BigInt(event.data[15]);
  const weapon_metadata = BigInt(event.data[16]);
  const chest_id = BigInt(event.data[17]);
  const chest_xp = BigInt(event.data[18]);
  const chest_metadata = BigInt(event.data[19]);
  const head_id = BigInt(event.data[20]);
  const head_xp = BigInt(event.data[21]);
  const head_metadata = BigInt(event.data[22]);
  const waist_id = BigInt(event.data[23]);
  const waist_xp = BigInt(event.data[24]);
  const waist_metadata = BigInt(event.data[25]);
  const foot_id = BigInt(event.data[26]);
  const foot_xp = BigInt(event.data[27]);
  const foot_metadata = BigInt(event.data[28]);
  const hand_id = BigInt(event.data[29]);
  const hand_xp = BigInt(event.data[30]);
  const hand_metadata = BigInt(event.data[31]);
  const neck_id = BigInt(event.data[32]);
  const neck_xp = BigInt(event.data[33]);
  const neck_metadata = BigInt(event.data[34]);
  const ring_id = BigInt(event.data[35]);
  const ring_xp = BigInt(event.data[36]);
  const ring_metadata = BigInt(event.data[37]);
  const beast_health = BigInt(event.data[38]);
  const stat_points_availabl = BigInt(event.data[39]);
  const mutated = BigInt(event.data[40]);
  const name = BigInt(event.data[41]);
  const home_realm = BigInt(event.data[42]);
  const clazz = BigInt(event.data[43]);
  const entropy = BigInt(event.data[44]);
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  const startGameData = {
    id: `${owner}/${tx.transaction_hash}`,
    owner: owner,
    adventurer_id: adventurer_id,
    no_message: no_message,
    last_action: last_action,
    health: health,
    xp: xp,
    strength: strength,
    dexterity: dexterity,
    vitality: vitality,
    intelligence: intelligence,
    wisdom: wisdom,
    charisma: charisma,
    luck: luck,
    gold: gold,
    weapon_id: weapon_id,
    weapon_xp: weapon_xp,
    weapon_metadata: weapon_metadata,
    chest_id: chest_id,
    chest_xp: chest_xp,
    chest_metadata: chest_metadata,
    head_id: head_id,
    head_xp: head_xp,
    head_metadata: head_metadata,
    waist_id: waist_id,
    waist_xp: waist_xp,
    waist_metadata: waist_metadata,
    foot_id: foot_id,
    foot_xp: foot_xp,
    foot_metadata: foot_metadata,
    hand_id: hand_id,
    hand_xp: hand_xp,
    hand_metadata: hand_metadata,
    neck_id: neck_id,
    neck_xp: neck_xp,
    neck_metadata: neck_metadata,
    ring_id: ring_id,
    ring_xp: ring_xp,
    ring_metadata: ring_metadata,
    beast_health: beast_health,
    stat_points_available: stat_points_availabl,
    mutated: mutated,
    name: name,
    home_realm: home_realm,
    clazz: clazz,
    entropy: entropy,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync('INSERT IGNORE INTO startgames SET ?', [startGameData]);
}

export async function slayedBeast({ block, tx, event, mysql }: Parameters<CheckpointWriter>[0]) {
  if (!event) return;
  console.log(event.data);
  const owner = toAddress(event.data[0]);
  const adventurer_id = BigInt(event.data[1]);
  const no_message = BigInt(event.data[2]);
  const last_action = BigInt(event.data[3]);
  const health = BigInt(event.data[4]);
  const xp = BigInt(event.data[5]);
  const strength = BigInt(event.data[6]);
  const dexterity = BigInt(event.data[7]);
  const vitality = BigInt(event.data[8]);
  const intelligence = BigInt(event.data[9]);
  const wisdom = BigInt(event.data[10]);
  const charisma = BigInt(event.data[11]);
  const luck = BigInt(event.data[12]);
  const gold = BigInt(event.data[13]);
  const weapon_id = BigInt(event.data[14]);
  const weapon_xp = BigInt(event.data[15]);
  const weapon_metadata = BigInt(event.data[16]);
  const chest_id = BigInt(event.data[17]);
  const chest_xp = BigInt(event.data[18]);
  const chest_metadata = BigInt(event.data[19]);
  const head_id = BigInt(event.data[20]);
  const head_xp = BigInt(event.data[21]);
  const head_metadata = BigInt(event.data[22]);
  const waist_id = BigInt(event.data[23]);
  const waist_xp = BigInt(event.data[24]);
  const waist_metadata = BigInt(event.data[25]);
  const foot_id = BigInt(event.data[26]);
  const foot_xp = BigInt(event.data[27]);
  const foot_metadata = BigInt(event.data[28]);
  const hand_id = BigInt(event.data[29]);
  const hand_xp = BigInt(event.data[30]);
  const hand_metadata = BigInt(event.data[31]);
  const neck_id = BigInt(event.data[32]);
  const neck_xp = BigInt(event.data[33]);
  const neck_metadata = BigInt(event.data[34]);
  const ring_id = BigInt(event.data[35]);
  const ring_xp = BigInt(event.data[36]);
  const ring_metadata = BigInt(event.data[37]);
  const beast_health = BigInt(event.data[38]);
  const stat_points_availabl = BigInt(event.data[39]);
  const mutated = BigInt(event.data[40]);
  const seed = BigInt(event.data[41]);
  const slayed_beast_id = BigInt(event.data[42]);
  const tier = BigInt(event.data[43]);
  const item_type = BigInt(event.data[44]);
  const level = BigInt(event.data[45]);
  const special1 = BigInt(event.data[46]);
  const special2 = BigInt(event.data[47]);
  const special3 = BigInt(event.data[48]);
  const damage_dealt = BigInt(event.data[49]);
  const critical_hit = BigInt(event.data[50]);
  const xp_earned_adventurer = BigInt(event.data[51]);
  const xp_earned_items = BigInt(event.data[52]);
  const gold_earned = BigInt(event.data[53]);
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  const slayedBeastData = {
    id: `${owner}/${tx.transaction_hash}`,
    owner: owner,
    adventurer_id: adventurer_id,
    no_message: no_message,
    last_action: last_action,
    health: health,
    xp: xp,
    strength: strength,
    dexterity: dexterity,
    vitality: vitality,
    intelligence: intelligence,
    wisdom: wisdom,
    charisma: charisma,
    luck: luck,
    gold: gold,
    weapon_id: weapon_id,
    weapon_xp: weapon_xp,
    weapon_metadata: weapon_metadata,
    chest_id: chest_id,
    chest_xp: chest_xp,
    chest_metadata: chest_metadata,
    head_id: head_id,
    head_xp: head_xp,
    head_metadata: head_metadata,
    waist_id: waist_id,
    waist_xp: waist_xp,
    waist_metadata: waist_metadata,
    foot_id: foot_id,
    foot_xp: foot_xp,
    foot_metadata: foot_metadata,
    hand_id: hand_id,
    hand_xp: hand_xp,
    hand_metadata: hand_metadata,
    neck_id: neck_id,
    neck_xp: neck_xp,
    neck_metadata: neck_metadata,
    ring_id: ring_id,
    ring_xp: ring_xp,
    ring_metadata: ring_metadata,
    beast_health: beast_health,
    stat_points_available: stat_points_availabl,
    mutated: mutated,
    seed: seed,
    slayed_beast_id: slayed_beast_id,
    tier: tier,
    item_type: item_type,
    level: level,
    special1: special1,
    special2: special2,
    special3: special3,
    damage_dealt: damage_dealt,
    critical_hit: critical_hit,
    xp_earned_adventurer: xp_earned_adventurer,
    xp_earned_items: xp_earned_items,
    gold_earned: gold_earned,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync('INSERT IGNORE INTO slayedbeasts SET ?', [slayedBeastData]);
}
