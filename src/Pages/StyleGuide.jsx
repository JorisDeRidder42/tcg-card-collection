import logo from '../assets/react.svg';
import '../styles/styleguide.css';
import {Button} from 'react-bootstrap';

const StyleGuide = () => {
    return(
        <div className="container py-5">

    <h1 className="mb-5 text-center">
        Style Guide
    </h1>
    <div className="row g-4">

        <div className="col-md-4">
            <div className="color-card background">
                <h5>Background</h5>
                <p>#020617</p>
            </div>
        </div>

        <div className="col-md-4">
            <div className="color-card cards">
                <h5>Card</h5>
                <p>#111827</p>
            </div>
        </div>

        <div className="col-md-4">
            <div className="color-card primary">
                <h5>Primary</h5>
                <p>#2563EB</p>
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
        <section className="mt-5">

        <div className="d-flex flex-wrap gap-3">
            <Button variant="primary">
            Primary
            </Button>
            <Button variant="secondary">
            Secondary
            </Button>
            <Button variant="outline-light">
                <span className="text-dark">Outline</span>
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
        </section>
                <div className="d-flex align-items-center gap-3 flex-wrap">

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
                        <span
                            className="spinner-border spinner-border-sm me-2"
                        />
                        Loading...
                    </Button>
                </div>
                <section className="style-section-dark">
                <h2 className="mt-5 mb-4 text-white">Cards</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="style-card glass">
                            <h5>Glass Card</h5>
                            <p>Login / Modal</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="style-card dashboard">
                            <h5>Dashboard Card</h5>
                            <p>Home</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="style-card pokemon">
                            <h5>Pokémon Card</h5>
                            <p>Collection</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    )
}
export default StyleGuide;