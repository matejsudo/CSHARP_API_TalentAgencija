$(document).ready(function () {
    // ********** AGENT MANAGEMENT **********

    function loadAgents() {
        $.get('/api/v1/agenti', function (agenti) {
            $('#agentList').empty(); 

            agenti.forEach(function (agent) {
                $('#agentList').append(`
                    <li>
                        ${agent.ime} ${agent.prezime} (Verificiran: ${agent.verificiran}) 
                        <button onclick="editAgent(${agent.sifra})">Uredi</button>
                        <button onclick="deleteAgent(${agent.sifra})">Obriši</button>
                    </li>
                `);
            });
        }).fail(function () {
            console.error("Neuspješno učitavanje agenata.");
        });
    }

    // Handle form submission for adding/updating an agent
    $('#agentForm').submit(function (e) {
        e.preventDefault();  // Prevent default form submission

        var agentID = $(this).data('agentID'); 
        var agentData = {
            ime: $('#ime').val(),
            prezime: $('#prezime').val(),
            agentOd: $('#agentOd').val(),
            verificiran: $('#verificiran').is(':checked') 
        };

        // Determine if it's an update or create
        if (agentID) {
            $.ajax({
                type: 'PUT',
                url: `/api/v1/agenti/${agentID}`,
                contentType: 'application/json',
                data: JSON.stringify(agentData),
                success: function () {
                    loadAgents();  
                    $('#agentForm')[0].reset();  
                    $('#agentForm').removeData('agentID');  // Clear the stored ID
                },
                error: function () {
                    alert("Greška pri ažuriranju agenta.");
                }
            });
        } else {
            // Add new agent
            $.ajax({
                type: 'POST',
                url: '/api/v1/agenti',
                contentType: 'application/json',
                data: JSON.stringify(agentData),
                success: function () {
                    loadAgents();  
                    $('#agentForm')[0].reset(); 
                },
                error: function () {
                    alert("Greška pri dodavanju agenta.");
                }
            });
        }
    });

    // Edit agent
    window.editAgent = function (agentID) {
        $.get(`/api/v1/agenti/${agentID}`, function (agent) {
            $('#ime').val(agent.ime);  // Pre-fill the form
            $('#prezime').val(agent.prezime);  // Pre-fill the form
            $('#agentOd').val(agent.agentOd ? new Date(agent.agentOd).toISOString().split('T')[0] : ''); // Format date
            $('#verificiran').prop('checked', agent.verificiran); // Set checkbox
            $('#agentForm').data('agentID', agentID);  // Store the ID for updating
        });
    };

    // Delete agent
    window.deleteAgent = function (agentID) {
        if (confirm("Da li ste sigurni da želite obrisati ovog agenta?")) {
            $.ajax({
                type: 'DELETE',
                url: `/api/v1/agenti/${agentID}`,
                success: function () {
                    loadAgents();  // Reload the agent list after deletion
                },
                error: function () {
                    alert("Greška pri brisanju agenta.");
                }
            });
        }
    };

    // ********** KLIJENT MANAGEMENT **********

    // Load the list of clients
    function loadClients() {
        $.get('/api/v1/klijenti', function (klijenti) {
            $('#clientList').empty();  // Clear the existing list

            klijenti.forEach(function (klijent) {
                $('#clientList').append(`
                    <li>
                        ${klijent.ime} ${klijent.prezime} (Agent: ${klijent.agent ? klijent.agent.ime + ' ' + klijent.agent.prezime : 'N/A'}) 
                        <button onclick="editClient(${klijent.sifra})">Uredi</button>
                        <button onclick="deleteClient(${klijent.sifra})">Obriši</button>
                    </li>
                `);
            });
        }).fail(function () {
            console.error("Neuspješno učitavanje klijenata.");
        });
    }

    // Load agents into the agent dropdown in the client form
    function loadAgentsForClients() {
        $.get('/api/v1/agenti', function (agenti) {
            $('#agentId').empty();  // Clear the existing dropdown options
            $('#agentId').append('<option value="" disabled selected>Odaberite agenta</option>'); // Prompt option

            agenti.forEach(function (agent) {
                $('#agentId').append(`<option value="${agent.sifra}">${agent.ime} ${agent.prezime}</option>`);
            });
        }).fail(function () {
            console.error("Neuspješno učitavanje agenata za klijente.");
        });
    }

    // Handle form submission for adding/updating a client
    $('#clientForm').submit(function (e) {
        e.preventDefault();  // Prevent default form submission

        var clientID = $(this).data('clientID'); // Get the client ID if editing
        var clientData = {
            sifra: clientID || 0,  // Include 'sifra' if updating
            ime: $('#ime').val(),
            prezime: $('#prezime').val(),
            datumRodjenja: $('#datumRodjenja').val(),
            korisnikOd: $('#korisnikOd').val(),
            email: $('#email').val(),
            agentSifra: $('#agentId').val() // Get the selected agent ID
        };

        // Log the data being sent for debugging
        console.log("Sending client data:", clientData);

        // Determine if it's an update or create
        if (clientID) {
            // Update existing client
            $.ajax({
                type: 'PUT',
                url: `/api/v1/klijenti/${clientID}`,
                contentType: 'application/json',
                data: JSON.stringify(clientData),
                success: function () {
                    loadClients();  // Reload the list of clients after updating
                    $('#clientForm')[0].reset();  // Clear the form input
                    $('#clientForm').removeData('clientID');  // Clear the stored ID
                },
                error: function (jqXHR) {
                    alert("Greška pri ažuriranju klijenta: " + jqXHR.responseText);
                }
            });
        } else {
            // Add new client
            $.ajax({
                type: 'POST',
                url: '/api/v1/klijenti',
                contentType: 'application/json',
                data: JSON.stringify(clientData),
                success: function () {
                    loadClients();  // Reload the list of clients after adding
                    $('#clientForm')[0].reset();  // Clear the form input
                },
                error: function (jqXHR) {
                    alert("Greška pri dodavanju klijenta: " + jqXHR.responseText);
                }
            });
        }
    });


    // Edit client
    window.editClient = function (clientID) {
        $.get(`/api/v1/klijenti/${clientID}`, function (klijent) {
            $('#ime').val(klijent.ime);  // Pre-fill the form
            $('#prezime').val(klijent.prezime);  // Pre-fill the form
            $('#datumRodjenja').val(klijent.datumRodjenja ? new Date(klijent.datumRodjenja).toISOString().split('T')[0] : '');
            $('#korisnikOd').val(klijent.korisnikOd ? new Date(klijent.korisnikOd).toISOString().slice(0, 16) : '');
            $('#email').val(klijent.email);
            $('#agentId').val(klijent.agentSifra);  // Set the selected agent
            $('#clientForm').data('clientID', clientID);  // Store the ID for updating
        });
    };

    // Delete client
    window.deleteClient = function (clientID) {
        if (confirm("Da li ste sigurni da želite obrisati ovog klijenta?")) {
            $.ajax({
                type: 'DELETE',
                url: `/api/v1/klijenti/${clientID}`,
                success: function () {
                    loadClients();  // Reload the client list after deletion
                },
                error: function () {
                    alert("Greška pri brisanju klijenta.");
                }
            });
        }
    };

    // ********** PROJEKT MANAGEMENT **********

    // Load the list of projects
    function loadProjects() {
        $.get('/api/v1/projekti', function (projekti) {
            $('#projectList').empty();  // Clear the existing list

            projekti.forEach(function (projekt) {
                $('#projectList').append(`
                    <li>
                        ${projekt.naziv} (Klijent: ${projekt.klijent ? projekt.klijent.ime + ' ' + projekt.klijent.prezime : 'N/A'}) 
                        <button onclick="editProject(${projekt.sifra})">Uredi</button>
                        <button onclick="deleteProject(${projekt.sifra})">Obriši</button>
                    </li>
                `);
            });
        }).fail(function () {
            console.error("Neuspješno učitavanje projekata.");
        });
    }

    // Load clients into the client dropdown in the project form
    function loadClientsForProjects() {
        $.get('/api/v1/klijenti', function (klijenti) {
            $('#klijentId').empty();  // Clear the existing dropdown options
            $('#klijentId').append('<option value="" disabled selected>Odaberite klijenta</option>'); // Prompt option

            klijenti.forEach(function (klijent) {
                $('#klijentId').append(`<option value="${klijent.sifra}">${klijent.ime} ${klijent.prezime}</option>`);
            });
        }).fail(function () {
            console.error("Neuspješno učitavanje klijenata za projekte.");
        });
    }

    // Handle form submission for adding/updating a project
    $('#projectForm').submit(function (e) {
        e.preventDefault();  // Prevent default form submission

        var projectID = $(this).data('projectID'); // Get the project ID if editing
        var projectData = {
            naziv: $('#naziv').val(),
            vrijednost: parseFloat($('#vrijednost').val()),
            pocetakProjekta: $('#pocetakProjekta').val(),
            krajProjekta: $('#krajProjekta').val(),
            opis: $('#opis').val(),
            klijentId: $('#klijentId').val() // Get the selected client ID
        };

        // Determine if it's an update or create
        if (projectID) {
            // Update existing project
            $.ajax({
                type: 'PUT',
                url: `/api/v1/projekti/${projectID}`,
                contentType: 'application/json',
                data: JSON.stringify(projectData),
                success: function () {
                    loadProjects();  // Reload the list of projects after updating
                    $('#projectForm')[0].reset();  // Clear the form input
                    $('#projectForm').removeData('projectID');  // Clear the stored ID
                },
                error: function () {
                    alert("Greška pri ažuriranju projekta.");
                }
            });
        } else {
            // Add new project
            $.ajax({
                type: 'POST',
                url: '/api/v1/projekti',
                contentType: 'application/json',
                data: JSON.stringify(projectData),
                success: function () {
                    loadProjects();  // Reload the list of projects after adding
                    $('#projectForm')[0].reset();  // Clear the form input
                },
                error: function () {
                    alert("Greška pri dodavanju projekta.");
                }
            });
        }
    });

    // Edit project
    window.editProject = function (projectID) {
        $.get(`/api/v1/projekti/${projectID}`, function (projekt) {
            $('#naziv').val(projekt.naziv);  // Pre-fill the form
            $('#vrijednost').val(projekt.vrijednost);
            $('#pocetakProjekta').val(projekt.pocetakProjekta ? new Date(projekt.pocetakProjekta).toISOString().slice(0, 16) : '');
            $('#krajProjekta').val(projekt.krajProjekta ? new Date(projekt.krajProjekta).toISOString().slice(0, 16) : '');
            $('#opis').val(projekt.opis);
            $('#klijentId').val(projekt.klijentId);  // Set the selected client
            $('#projectForm').data('projectID', projectID);  // Store the ID for updating
        });
    };

    // Delete project
    window.deleteProject = function (projectID) {
        if (confirm("Da li ste sigurni da želite obrisati ovaj projekt?")) {
            $.ajax({
                type: 'DELETE',
                url: `/api/v1/projekti/${projectID}`,
                success: function () {
                    loadProjects();  // Reload the project list after deletion
                },
                error: function () {
                    alert("Greška pri brisanju projekta.");
                }
            });
        }
    };

    // ********** INITIAL LOAD **********

    // Check which page we're on to load the appropriate data
    if ($('#agentForm').length) {
        loadAgents(); // Load agents on index.html
    }

    if ($('#clientForm').length) {
        loadAgentsForClients(); // Load agents into the client form
        loadClients(); // Load clients on klijenti.html
    }

    if ($('#projectForm').length) {
        loadClientsForProjects(); // Load clients into the project form
        loadProjects(); // Load projects on projekti.html
    }
});
