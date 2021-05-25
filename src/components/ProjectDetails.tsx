import React, {ReactElement} from "react"
import {useParams} from "react-router"
import {Link} from "react-router-dom"
import {useProjectApi} from "../shared/ProjectApi"
import {DispatchActions, Store} from "../Store"
import Project from "../types/Project"

interface Props {
  store: Store;
  dispatch: DispatchActions;
}

function ProjectDetails(props: Props): ReactElement {
  const {projectId} = useParams<{projectId: string}>()
  const [project] = useProjectApi<Project>('get', `projects/${projectId}`)

  if (!project) {return <p>Lade</p>}

  const onAddToFavorite = () => {
    props.dispatch({type: 'ADD_TO_FAVORITES', project})
  }

  const onRemoveFromFavorite = () => {
    props.dispatch({type: 'REMOVE_FROM_FAVORITES', project})
  }

  const countLikes = (): number => {
    return props.store.favorites.filter(project_ => project_.id === project.id).length
  }

  return (
    <>
      <div>
        <h1>{project.title}</h1>
        <div className="ui divider" />
        <div className="ui grid">
          <div className="four wide column">
            <h4>
              <i className="file image outline middle aligned icon" />
              Image
            </h4>
            <img className="ui image" alt="" src={project.img} />
          </div>
          <div className="four wide column">
            <h4>
              <i className="clock outline middle aligned icon" />
              Times
            </h4>
          </div>
          <div className="four wide column">
            <h4>
              <i className="flag outline middle aligned icon" />
              Progress
            </h4>
          </div>
          <div className="four wide column">
            <h4>
              <i className="compass outline middle aligned icon" />
              Status
            </h4>
            <p>{project.status}</p>
          </div>
        </div>
      </div>
      <div className="ui buttons">
        <div onClick={onAddToFavorite} className="ui icon button">
          <i className="thumbs green up icon" />
        </div>
        <div onClick={onRemoveFromFavorite} className="ui icon button">
          <i className="thumbs red down icon" />
        </div>
        <span className="ui button">
          {countLikes()}
        </span>
      </div>
      <div className="ui divider" />
      <Link className="ui red button" to="/projects">Back</Link>
      <Link className="ui yellow button" to={`/projects/${projectId}/edit`}>Edit</Link>
    </>
  )
}

export default ProjectDetails
