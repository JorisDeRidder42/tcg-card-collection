import { Button, Form, Badge, ProgressBar } from "react-bootstrap";
import "../styles/styleguide.css";

const StyleGuide = () => {

    return (
        <div className="styleguide-page container-fluid py-5">
            <h1 className="mb-5 text-center text-gradient">
                Pokédex Collection Style Guide
            </h1>

            {/* =========================
                COLORS
            ========================= */}
            <section>
                <h2 className="mb-4">
                    Colors
                </h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="color-card background">
                            <h5>Background</h5>
                            <p>#020617</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="color-card cards">
                            <h5>Surface</h5>
                            <p>#111827</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="color-card primary">
                            <h5>Primary Gradient</h5>
                            <p>Blue → Purple</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="color-card accent">
                            <h5>Accent</h5>
                            <p>#7C3AED</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="color-card gold">
                            <h5>Gold</h5>
                            <p>#FACC15</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
                BUTTONS
            ========================= */}
            <section className="mt-5">
                <h2 className="mb-4">
                    Buttons
                </h2>
                <div className="d-flex flex-wrap gap-3">
                    <Button variant="primary">
                        Primary
                    </Button>
                    <Button variant="secondary">
                        Secondary
                    </Button>
                    <Button variant="outline-light">
                        Outline
                    </Button>
                    <Button variant="success">
                        Success
                    </Button>
                    <Button variant="danger">
                        Danger
                    </Button>
                    <Button disabled>
                        Disabled
                    </Button>
                    <Button>
                        ⭐ Favorite
                    </Button>
                </div>

                <div className="d-flex align-items-center gap-3 flex-wrap mt-4">
                    <Button size="sm">
                        Small
                    </Button>

                    <Button>
                        Default
                    </Button>

                    <Button size="lg">
                        Large
                    </Button>

                    <Button disabled>
                        <span className="spinner-border spinner-border-sm me-2"/>
                        Loading...
                    </Button>
                </div>
            </section>

            {/* =========================
                CARDS
            ========================= */}
            <section className="style-section-dark mt-5">
                <h2 className="mb-4">
                    Cards
                </h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="style-card glass">
                            <h5>
                                Glass Card
                            </h5>
                            <p>
                                Login / Modal
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="style-card dashboard">
                            <h5>
                                Dashboard Card
                            </h5>
                            <p>
                                Home
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="style-card pokemon">
                            <h5>
                                Pokémon Card
                            </h5>
                            <p>
                                Collection
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* =========================
                INPUTS
            ========================= */}
            <section className="mt-5">
                <h2 className="mb-4">
                    Inputs
                </h2>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Normal Input
                        </Form.Label>


                        <Form.Control
                            className="style-input"
                            type="text"
                            placeholder="Test input"
                        />
                    </Form.Group>
                    <Button
                        className="mt-3"
                        variant="primary"
                    >
                        Submit
                    </Button>
                </Form>
            </section>
            <section>
                    <div>
                        <h1 className="text-gradient">
                        Pokédex Collection
                        </h1>

                        <h2>
                        My Collection
                        </h2>

                        <p className="text-muted">
                        Track your cards
                        </p>
                    </div>
            </section>
            <section>
                {/* =========================
    BADGES
========================= */}

<section className="mt-5">
    <div className="d-flex flex-wrap gap-3">
        <span className="badge-style fire">
            🔥 Fire
                </span>
                <span className="badge-style water">
                    💧 Water
                </span>
                <span className="badge-style grass">
                    🌿 Grass
                </span>
                <span className="badge-style electric">
                    ⚡ Electric
                </span>
                <span className="badge-style dragon">
                    🐉 Dragon
                </span>
            </div>
                <h5 className="mt-4">
                    Rarity
                </h5>
            <div className="d-flex flex-wrap gap-3">
                <span className="badge-style legendary">
                    ⭐ Legendary
                </span>
                <span className="badge-style rare">
                    ✨ Rare
                </span>
                <span className="badge-style holo">
                    🎴 Holo
                </span>
                <span className="badge-style common">
                    Common
                </span>
            </div>
            </section>
                    {/* =========================
                        PROGRESS BARS
                    ========================= */}
                   {/* =========================
    PROGRESS
========================= */}

<section className="mt-5">

    <h2 className="mb-4">
        Progress Bars
    </h2>


    <div className="mb-4">

        <div className="d-flex justify-content-between mb-2">
            <span>
                Scarlet & Violet
            </span>

            <span>
                72%
            </span>
        </div>


        <ProgressBar 
            now={72}
            className="pokemon-progress"
        />

    </div>



    <div className="mb-4">

        <div className="d-flex justify-content-between mb-2">
            <span>
                Completed Set
            </span>

            <span>
                100%
            </span>
        </div>


        <ProgressBar 
            now={100}
            className="pokemon-progress success"
        />

    </div>



    <div className="mb-4">

        <div className="d-flex justify-content-between mb-2">
            <span>
                New Collection
            </span>

            <span>
                25%
            </span>
        </div>


        <ProgressBar 
            now={25}
            className="pokemon-progress danger"
        />

    </div>


</section>
            </section>
        </div>
    );
};
export default StyleGuide;