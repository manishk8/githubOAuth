export const RepoList = (props) => {
    return(
    <div className="repo-list">
        <h3>Repositories List</h3>
        <ul>
            {props.repoList.map((data, index) =>
                <li key={index} onClick={() => props.handleActivity(data.name)} title="View Activity" >{data.name}</li>
             )}
        </ul>
    </div>
    )
}