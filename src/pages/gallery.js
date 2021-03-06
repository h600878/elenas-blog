import * as React from "react";
import * as Modal from "react-modal";
import {graphql, Link} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import classNames from "classnames";
import {X} from "react-feather";
import Layout from "../layouts/layout";
import BlogData from "../layouts/blogData";
import {emptyPageStyle} from "../stylesheets/page.module.css";
import {imageContainer, galleryContainer, galleryDataStyle, galleryOverlayDataStyle, overlay, content, ReactModal__BodyOpen, galleryGrid} from "../stylesheets/gallery.module.css"
import {galleryPageColor} from "../stylesheets/colors.module.css";
import {hidden} from "../stylesheets/screen.module.css";

const imageStyle = {
    maxwidth: "100%", maxHeight: "100%",
    width: "auto", height: "auto",
    marginLeft: "auto", marginRight: "auto",
}
const closeButtonStyle = {
    position: "absolute",
    right: 0,
    cursor: "pointer",
    zIndex: "99",
    border: "none",
    background: "rgba(0, 0, 0, 0)",
}
const buttonStandard = {
    border: "none",
    color: "inherit",
    backgroundColor: "transparent",
    textDecoration: "none",
}

const Gallery = ({data}) => {

    const isTouch = (typeof window !== "undefined" || typeof navigator !== "undefined") ?
        'onTouchStart' in window || navigator.maxTouchPoints > 0 : false;
    const blogPost = data.allContentfulBlogPost;

    let pics = [];
    let i = 0;
    while (blogPost.nodes[i] !== undefined) {
        let j = 0;
        while (blogPost.nodes[i].pictures[j] !== undefined) {
            const pic = {
                title: blogPost.nodes[i].title,
                slug: blogPost.nodes[i].slug,
                createdAt: blogPost.nodes[i].createdAt,
                timeToRead: blogPost.nodes[i].body.childMarkdownRemark.timeToRead,
                img: blogPost.nodes[i].pictures[j].gatsbyImageData,
                imgAlt: blogPost.nodes[i].pictures[j].description,
                id: blogPost.nodes[i].pictures[j].id,
            }
            pics.push(pic);
            j++;
        }
        i++;
    }

    if (typeof document !== "undefined") {
        Modal.setAppElement(document.getElementById('___gatsby'));
    }
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [picObj, setPicObj] = React.useState(null);

    function openModal(pic) {
        setModalIsOpen(true);
        setPicObj(pic);
    }
    function closeModal() {
        setModalIsOpen(false);
        setPicObj(null);
    }

    return ( //TODO Keyboard listeners for onClick
        <Layout title={"Gallery"} homePageColor={galleryPageColor} children={
            (pics.length === 0) ?
                <span className={emptyPageStyle}>There are currently no posts with pictures :(</span> : (
                    <div className={classNames(galleryContainer, galleryGrid)}>
                        {
                            (isTouch || (typeof document !== "undefined") ? document.documentElement.clientWidth <= 820 : false) ? ( //If touchScreen or width is <= x
                                pics.map(pic => ( //Touch screen
                                    <article className={imageContainer} key={pic.id}> {/*Should be <div> but images won't load after page reloads*/}
                                        <button style={buttonStandard} onClick={() => openModal(pic)}>
                                            <GatsbyImage
                                                style={imageStyle}
                                                image={getImage(pic.img)}
                                                alt={pic.imgAlt}
                                            />
                                        </button>
                                        <Modal
                                            isOpen={modalIsOpen}
                                            onRequestClose={closeModal}
                                            contentLabel={"Image"}
                                            className={content}
                                            overlayClassName={overlay}
                                            shouldCloseOnOverlayClick={true}
                                            shouldCloseOnEsc={true}
                                            bodyOpenClassName={ReactModal__BodyOpen}>
                                            <div>
                                                {(picObj === null) ? null :
                                                    (
                                                        <>
                                                            <button style={closeButtonStyle}>
                                                                <X onClick={closeModal} style={{backgroundColor: "rgba(255, 255, 255, 0.2)"}}/>
                                                                <span className={hidden}>Close window</span>
                                                            </button>

                                                            <GatsbyImage style={imageStyle} alt={picObj.imgAlt}
                                                                         image={getImage(picObj.img)}/>
                                                            <div className={galleryOverlayDataStyle}>
                                                                <Link to={"../blog/" + picObj.slug}>
                                                                    <h3>{picObj.title}</h3>
                                                                </Link>
                                                                <BlogData createdAt={picObj.createdAt}
                                                                          timeToRead={picObj.timeToRead}/>
                                                                <p></p>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </Modal>
                                    </article>
                                ))
                            ) : (
                                <>
                                    { //Not touch screen
                                        pics.map(pic => (
                                            <div className={imageContainer} key={pic.id}>
                                                <Link to={"../blog/" + pic.slug}>
                                                    <GatsbyImage
                                                        style={imageStyle}
                                                        image={getImage(pic.img)}
                                                        alt={pic.imgAlt}
                                                    />
                                                </Link>
                                                <div className={galleryDataStyle}>
                                                    <Link style={{color: "white"}} to={"../blog/" + pic.slug}>
                                                        <h3 style={{marginBottom: 0, marginTop: "5px"}}>{pic.title}</h3>
                                                    </Link>
                                                    <BlogData createdAt={pic.createdAt} timeToRead={pic.timeToRead}/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            ) //End isTouch
                        }
                    </div>
                )
        }
                description={"A gallery of delicious food."}/> //TODO better description
    );
}

export const query = graphql `
query {
  allContentfulBlogPost(sort: {fields: createdAt, order: DESC}) {
    nodes {
      title
      createdAt(formatString: "Do MMMM YYYY, H:mm")
      slug
      body {
        childMarkdownRemark {
          timeToRead
        }
      }
      pictures {
        gatsbyImageData
        description
        id
      }
      id
    }
  }
}
`

export default Gallery
