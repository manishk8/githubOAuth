export const Activities = (props) => {
const activityData = props.activityData;

    return(
        <>
            {activityData ?
                <div className="activities">
                    <button onClick={() => props.setShowActivity(false)}>Back to Repositories</button>
                    <div className="list-data">
                        <h3>Repository Name: {activityData.name}</h3>
                        <p>Description: {activityData.description}</p>
                        <p>Created At: {activityData.created_at}</p>
                        <p>Git Url: {activityData.git_url}</p>
                        <p>Watchers Count: {activityData.watchers_count}</p>
                        <p>Open Issues: {activityData.open_issues_count}</p>
                    </div>
                </div>
                :
                <div className="activities">
                    <button onClick={() => props.setShowActivity(false)}>Back to Repositories</button>
                    <h2>Data not found</h2>
                </div>
            }
        </>
    )
}