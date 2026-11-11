import express from "express";
import path from "node:path";
import { engine } from "express-handlebars";
import { site, nav, posts } from "./data/site.data.js";

const app = express();
const viewsDir = path.join(import.meta.dirname, "views");
const publicDir = path.join(import.meta.dirname, "..", "public");

app.engine(
    "handlebars",
    engine({
        layoutsDir: path.join(viewsDir, "layouts"),
        partialsDir: path.join(viewsDir, "partials"),
        defaultLayout: "main",
        extname: ".handlebars",
        helpers: {
            eq: (a, b) => a === b,
            formatDate: (value) =>
                new Intl.DateTimeFormat("es-AR", {
                    dateStyle: "long",
                    timeZone: "UTC",
                }).format(new Date(value)),
        },
    }),
);

app.set("view engine", "handlebars");
app.set("views", viewsDir);

app.locals.site = site;
app.locals.nav = nav;

app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: false }));

function homeContext(contact = {}) {
    return {
        title: "Inicio", section: "home", bodyClass: "", headerClass: "",
        posts, contact,
    };
}

app.get("/", (request, response) => {
    response.render("home", homeContext({ sent: request.query.sent === "1" }));
});

app.get("/posts/:slug", (request, response, next) => {
    const post = posts.find((item) => item.slug === request.params.slug);
    if (!post) return next();

    response.render("post", {
        title: post.title, section: "home", bodyClass: "subpage", headerClass: "alt",
        post,
    });
});

app.get("/elements", (request, response) => {
    response.render("elements", {
        title: "Elementos", section: "elements", bodyClass: "subpage", headerClass: "alt",
    });
});


app.post("/contact", (request, response) => {
    const body = request.body ?? {};
    const text = (key) => typeof body[key] === "string" ? body[key].trim() : "";
    const name = text("name");
    const email = text("email");
    const message = text("message");
    const errors = [];

    if (name.length < 2) errors.push("El nombre debe tener al menos 2 caracteres.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Ingresá un email válido.");
    if (message.length < 10) errors.push("El mensaje debe tener al menos 10 caracteres.");

    if (errors.length > 0) {
        return response.status(422).render("home", homeContext({ name, email, message, errors }));
    }

    return response.redirect(303, "/?sent=1#footer");
});

app.get("/api/health", (request, response) => {
    response.json({ status: "ok" });
})

app.get("/api/posts", (request, response) => {
    response.json(posts);
})


app.use((request, response) => {
    response.status(404).render("404", {
        title: "No encontrado",
        bodyClass: "subpage",
        headerClass: "alt",
    });
});


app.use((error, request, response, next) => {
    console.error(error);
    if (response.headersSent) return next(error);
    response.status(500).render("500", {
        title: "Error", section: "", bodyClass: "subpage", headerClass: "alt",
    });

});

export default app;