import db from './db.js'

const getAllProjects = async () => {

    const query = `
        SELECT
            project_id,
            name,
            description,
            organization_id
        FROM public.project
        ORDER BY name;
    `

    const result = await db.query(query)

    return result.rows
}

export { getAllProjects, getProjectsByOrganizationId };

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            name,
            description
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationId];

    const result = await db.query(query, queryParams);

    return result.rows;
};