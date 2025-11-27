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
	websiteUrl?: string;
	featured?: boolean;
}

export const projects: Project[] = [
	{
		name: 'Cyber security inspired project',
		description:
			'Website that is meant to show users just how much personal data is collected the very moment they visit a website using basic web broswer APIs.',
		techStack: ['SvelteKit', 'TypeScript', 'Node.js'],
		websiteUrl: 'https://sword-of-damocles.vercel.app/',
		githubUrl: 'https://github.com/JoseRaul42/sword_of_damocles',
		featured: true
	},
	{
		name: 'Real-time Analytics Dashboard',
		description:
			'Live data visualizations dashboard of economic indicators and Upstream spot prices charted to display long-term trends.',
		techStack: ['SvelteKit', 'TypeScript', 'Node.js'],
		websiteUrl: 'https://economic-dashboard-qg3wfz8cd-yerrs-projects.vercel.app/',
		githubUrl: 'https://github.com/JoseRaul42/economic_Dashboard',
		featured: true
	},
	{
		name: 'First Personal Website',
		description:
			'This was my first deployed website. This was a very fun personal project where I attempted to create space themed Myspace personal website.',
		techStack: ['SvelteKit', 'Node.js'],
		websiteUrl: 'https://myspace-topaz-chi.vercel.app/',
		githubUrl: 'https://github.com/JoseRaul42/myspace'
	},
	// {
	// 	name: 'Data Quality Framework',
	// 	description: 'Automated data validation and quality monitoring system for data warehouses.',
	// 	techStack: ['Python', 'Great Expectations', 'dbt', 'Snowflake'],
	// 	githubUrl: 'https://github.com/yourusername/data-quality'
	// },
	// {
	// 	name: 'Log Aggregation Service',
	// 	description: 'Distributed log collection and analysis system using osquery and custom parsers.',
	// 	techStack: ['Go', 'osquery', 'Elasticsearch', 'Kafka'],
	// 	githubUrl: 'https://github.com/yourusername/log-aggregator'
	// },
	// {
	// 	name: 'ML Model Deployment Pipeline',
	// 	description:
	// 		'CI/CD pipeline for machine learning models with automated testing and versioning.',
	// 	techStack: ['Python', 'MLflow', 'Docker', 'Kubernetes'],
	// 	githubUrl: 'https://github.com/yourusername/ml-pipeline'
	// }
];
