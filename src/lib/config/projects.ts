/**
 * Configuration for favorite GitHub projects
 *
 * TODO: Update this list with your actual projects
 * - Replace repo URLs with your GitHub repositories
 * - Update descriptions to match your work
 * - Modify tech stack badges as needed
 */

export interface Project {
	name: string;
	description: string;
	techStack: string[];
	githubUrl: string;
	featured?: boolean;
}

export const projects: Project[] = [
	{
		name: 'Data Pipeline Orchestrator',
		description:
			'Scalable ETL pipeline framework for processing large-scale data with fault tolerance and monitoring.',
		techStack: ['Python', 'Apache Airflow', 'PostgreSQL', 'Docker'],
		githubUrl: 'https://github.com/yourusername/data-pipeline',
		featured: true
	},
	{
		name: 'Real-time Analytics Dashboard',
		description:
			'Live data visualization platform for streaming analytics with WebSocket integration.',
		techStack: ['C#', '.NET', 'SignalR', 'React', 'SQL Server'],
		githubUrl: 'https://github.com/yourusername/analytics-dashboard',
		featured: true
	},
	{
		name: 'SQL Query Optimizer',
		description:
			'Tool for analyzing and optimizing complex SQL queries with performance recommendations.',
		techStack: ['Python', 'SQL', 'PostgreSQL', 'FastAPI'],
		githubUrl: 'https://github.com/yourusername/sql-optimizer'
	},
	{
		name: 'Data Quality Framework',
		description: 'Automated data validation and quality monitoring system for data warehouses.',
		techStack: ['Python', 'Great Expectations', 'dbt', 'Snowflake'],
		githubUrl: 'https://github.com/yourusername/data-quality'
	},
	{
		name: 'Log Aggregation Service',
		description: 'Distributed log collection and analysis system using osquery and custom parsers.',
		techStack: ['Go', 'osquery', 'Elasticsearch', 'Kafka'],
		githubUrl: 'https://github.com/yourusername/log-aggregator'
	},
	{
		name: 'ML Model Deployment Pipeline',
		description:
			'CI/CD pipeline for machine learning models with automated testing and versioning.',
		techStack: ['Python', 'MLflow', 'Docker', 'Kubernetes'],
		githubUrl: 'https://github.com/yourusername/ml-pipeline'
	}
];
