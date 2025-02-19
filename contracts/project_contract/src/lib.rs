#![no_std]

mod project;
mod create_project;
// mod vote_project;
// mod fund_project;
// mod release_milestone;
// mod refund;
// mod create_project_event;
// mod create_project_storage;
mod tests;

use soroban_sdk::contract;

#[contract]
pub struct BoundlessContract;
