(function() {
    
    angular.module("apilaApp").service("exportPdf", exportPdf);
    
    function exportPdf() {
        
        var exportAppointments = function(name, printable, header) {
            var doc = new jsPDF('p','pt','letter');
            
            console.log(printable);
            
            margins = {
                top: 120,
                bottom: 5,
                left: 40,
                width: 22
            };

            var ignorableElements = {
                "#non-print" : function(element, renderer) {
                    return true;
                }
            };

            doc.fromHTML(printable, margins.left, margins.top, {
                "width": margins.width,
                "elementHandlers": ignorableElements
            },
            function(dispose) {
                doc.setFontSize(22);
                doc.text(40, 50, "List of appointments for: " + header.name);
                doc.text(40, 100, "Date: " + name);
                doc.save(name);
            }, margins);                       

        }
        
        var exportAppointmentDetail = function(name, printable) {
            var doc = new jsPDF('p','pt','letter');

            margins = {
                top: 100,
                bottom: 5,
                left: 40,
                width: 22
            };

            var ignorableElements = {
                "#non-print" : function(element, renderer) {
                    return true;
                }
            };

            doc.fromHTML(printable, margins.left, margins.top, {
                "width": margins.width,
                "elementHandlers": ignorableElements
            },
            function(dispose) {
                doc.setFontSize(22);
                doc.text(100, 50, "List of appointments for Date");
                doc.save(name);
            }, margins);  
        }
     
        return {
            exportAppointments: exportAppointments,
            exportAppointmentDetail: exportAppointmentDetail
        };
            
    }
    
})();