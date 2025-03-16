#![no_std]

mod create_project;
mod project;
// pub use crate::vote_project::
// mod fund_project;
// mod release_milestone;
// mod refund;
// mod create_project_event;
// mod create_project_storage;
mod tests;

use soroban_sdk::contract;

#[contract]
pub struct BoundlessContract;
