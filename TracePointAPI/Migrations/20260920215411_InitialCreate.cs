using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TracePointAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cases",
                columns: table => new
                {
                    CaseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases", x => x.CaseID);
                });

            migrationBuilder.CreateTable(
                name: "Evidence",
                columns: table => new
                {
                    EvidenceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evidence", x => x.EvidenceID);
                });

            migrationBuilder.CreateTable(
                name: "Suspects",
                columns: table => new
                {
                    SuspectID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Occupation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suspects", x => x.SuspectID);
                });

            migrationBuilder.CreateTable(
                name: "Investigations",
                columns: table => new
                {
                    InvestigationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseID = table.Column<int>(type: "int", nullable: false),
                    SuspectID = table.Column<int>(type: "int", nullable: false),
                    Conclusion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateStarted = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Investigations", x => x.InvestigationID);
                    table.ForeignKey(
                        name: "FK_Investigations_Cases_CaseID",
                        column: x => x.CaseID,
                        principalTable: "Cases",
                        principalColumn: "CaseID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Investigations_Suspects_SuspectID",
                        column: x => x.SuspectID,
                        principalTable: "Suspects",
                        principalColumn: "SuspectID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Cases",
                columns: new[] { "CaseID", "CaseName", "Description", "Status" },
                values: new object[] { 1, "The Missing Prototype", "A technology company has reported that an experimental prototype disappeared from its research laboratory between 22:00 and 00:00. Only three employees had legitimate access to the area.", "Open" });

            migrationBuilder.InsertData(
                table: "Evidence",
                columns: new[] { "EvidenceID", "Description", "Location", "Title" },
                values: new object[,]
                {
                    { 1, "Jamie Smith's access card was used to enter the research laboratory at 23:41.", "Security Office", "Security Access Log" },
                    { 2, "CCTV footage shows a person entering the laboratory at approximately 23:43. The person's face cannot be clearly identified.", "Research Laboratory", "CCTV Report" },
                    { 3, "A partial fingerprint was found on the prototype storage cabinet. The fingerprint belongs to a person who regularly works in the laboratory.", "Research Laboratory", "Fingerprint Report" },
                    { 4, "An email sent shortly before the incident states: \"The prototype must be moved before tomorrow's demonstration.\"", "Archive Room", "Email Message" },
                    { 5, "A photograph taken after the incident shows that the prototype cabinet was open and the laboratory lights were switched off.", "Research Laboratory", "Photograph" }
                });

            migrationBuilder.InsertData(
                table: "Suspects",
                columns: new[] { "SuspectID", "Description", "Name", "Occupation" },
                values: new object[,]
                {
                    { 1, "Developed the software used by the prototype and had access to the laboratory.", "Alex Morgan", "Software Developer" },
                    { 2, "Responsible for security at the building on the night of the incident.", "Jamie Smith", "Security Officer" },
                    { 3, "Worked with the research team and had access to the laboratory during working hours.", "Taylor Williams", "Research Assistant" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Investigations_CaseID",
                table: "Investigations",
                column: "CaseID");

            migrationBuilder.CreateIndex(
                name: "IX_Investigations_SuspectID",
                table: "Investigations",
                column: "SuspectID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Evidence");

            migrationBuilder.DropTable(
                name: "Investigations");

            migrationBuilder.DropTable(
                name: "Cases");

            migrationBuilder.DropTable(
                name: "Suspects");
        }
    }
}
