package no.hvl.dat152.js.response;

import no.hvl.dat152.js.model.Student;

public class GetStudentlistResponse extends ServerResponse {
    private Iterable<Student> students;

    public Iterable<Student> getStudents() {
        return students;
    }

    public void setStudents(Iterable<Student> students) {
        this.students = students;
    }
}
