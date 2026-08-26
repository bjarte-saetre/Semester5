class FormDemo {
    constructor(form) {
        form.addEventListener("submit", event => { this.getformdata(event) });
    }

    getformdata(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        if ((!formData.has("coursename")) || (!formData.has("lecturer"))) {
            console.log("Missing data");
            return;
        }

        const coursedetails = {
            coursename: formData.get("coursename").trim(),
            lecturer: formData.get("lecturer").trim()
        }

    console.log(`Course name is ${coursedetails.coursename} and lecturer is ${coursedetails.lecturer}`);

    }
}


const form = document.querySelector("form");
new FormDemo(form)
