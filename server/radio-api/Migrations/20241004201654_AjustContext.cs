using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace radioapi.Migrations
{
    /// <inheritdoc />
    public partial class AjustContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_stations_users_UserId",
                table: "stations");

            migrationBuilder.AddForeignKey(
                name: "FK_stations_users_UserId",
                table: "stations",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_stations_users_UserId",
                table: "stations");

            migrationBuilder.AddForeignKey(
                name: "FK_stations_users_UserId",
                table: "stations",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id");
        }
    }
}
