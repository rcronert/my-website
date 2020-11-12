import React from "react"
import Image from "../components/image"

const AboutMe = () => {

    return (
        <section id="about-me">
            <div className="section-content">
                <h1>About me</h1>
                <div className="introduction">
                    <div className="photo-container">
                        <Image src="cv_photo.jpg" alt="photo image" />
                    </div>
                    <div className="description">
                        <p>
                            En tant que développeur Front-End depuis maintenant 5 ans, j'ai eu l'occasion d'intervenir sur des projets variés pour des clients grands comptes tels que Total, Criteo, Canal Plus ou encore le Conseil Régional PACA.
                        </p>
                        <p>
                            Passionné par les technologies web, je saurai être force de proposition pour apporter une valeur ajoutée à vos projets.
                        </p>
                        <p>
                            Ma curiosité me permet d'être informé et à jour sur les nouvelles pratiques et stacks techniques.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default AboutMe
