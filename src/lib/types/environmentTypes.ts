export type Environment = {
	environment_name: string;
	production: boolean;
	public_chain_id: string;
	public_pond_token_address: string;
	public_mPond_token_address: string;
	public_oyster_contract_address: string;
	public_pond_subgraph_url: string;
	public_mPond_subgraph_url: string;
	public_contract_subgraph_url: string;
	public_bridge_contract_subgraph_url: string;
	public_enclaves_contract_subgraph_url: string;
	public_contract_details_url: string;
	public_bridge_contract_details_url: string;
	public_oyster_instances_using_cp_url: string;
	public_oyster_instances_using_operator_address: string;
	public_oyster_provider_names_url: string;
	public_oyster_provider_instances_url: string;
	public_oyster_job_status_url: string,
	valid_chain_ids: number[];
};
