/**
 * Configuration for favorite tech stack
 *
 * TODO: Customize this list with your actual tech stack
 * - Add or remove technologies based on your experience
 * - Update categories as needed
 * - Consider adding proficiency levels if desired
 */

export interface StackCategory {
	name: string;
	tools: StackItem[];
}

export interface StackItem {
	name: string;
	icon?: string; // Optional: emoji or icon identifier
}

export const techStack: StackCategory[] = [
	{
		name: 'Data & Databases',
		tools: [
			{ name: 'SQL Server', icon: '🗄️' },
			{ name: 'PostgreSQL', icon: '🐘' },
			{ name: 'MongoDB', icon: '🍃' },
			{ name: 'Redis', icon: '⚡' },
			{ name: 'Snowflake', icon: '❄️' },
			{ name: 'Apache Kafka', icon: '📨' }
		]
	},
	{
		name: 'Backend & Languages',
		tools: [
			{ name: '.NET', icon: '💜' },
			{ name: 'C#', icon: '🔷' },
			{ name: 'Python', icon: '🐍' },
			{ name: 'Go', icon: '🔵' },
			{ name: 'Node.js', icon: '🟢' },
			{ name: 'TypeScript', icon: '📘' }
		]
	},
	{
		name: 'Frontend',
		tools: [
			{ name: 'Svelte', icon: '🧡' },
			{ name: 'SvelteKit', icon: '🚀' },
			{ name: 'React', icon: '⚛️' },
			{ name: 'TailwindCSS', icon: '🎨' },
			{ name: 'HTML/CSS', icon: '📄' }
		]
	},
	{
		name: 'Data Engineering',
		tools: [
			{ name: 'Apache Airflow', icon: '🌬️' },
			{ name: 'dbt', icon: '🔧' },
			{ name: 'Spark', icon: '✨' },
			{ name: 'Pandas', icon: '🐼' },
			{ name: 'Great Expectations', icon: '✅' }
		]
	},
	{
		name: 'Infrastructure & Tools',
		tools: [
			{ name: 'Docker', icon: '🐳' },
			{ name: 'Kubernetes', icon: '☸️' },
			{ name: 'Git', icon: '📦' },
			{ name: 'Linux', icon: '🐧' },
			{ name: 'osquery', icon: '🔍' },
			{ name: 'Terraform', icon: '🏗️' }
		]
	},
	{
		name: 'Cloud Platforms',
		tools: [
			{ name: 'AWS', icon: '☁️' },
			{ name: 'Azure', icon: '🔷' },
			{ name: 'GCP', icon: '🌐' }
		]
	}
];
