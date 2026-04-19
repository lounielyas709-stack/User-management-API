#!/bin/bash
# Tests de toutes les routes de l API MovieTreasures
# Usage: bash scripts/test-api.sh

BASE="http://localhost:3000/api"
PASS=0
FAIL=0

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RESET='\033[0m'

check() {
  local label="$1" expected="$2" actual="$3"
  if echo "$actual" | grep -qF "$expected"; then
    echo -e "  ${GREEN}OK${RESET} $label"
    PASS=$((PASS+1))
  else
    echo -e "  ${RED}KO${RESET} $label"
    echo -e "    ${YELLOW}Expected to contain:${RESET} $expected"
    echo -e "    ${YELLOW}Got:${RESET} $(echo "$actual" | head -c 200)"
    FAIL=$((FAIL+1))
  fi
}

check_absent() {
  local label="$1" absent="$2" actual="$3"
  if echo "$actual" | grep -qF "$absent"; then
    echo -e "  ${RED}KO${RESET} $label"
    echo -e "    ${YELLOW}Should NOT contain:${RESET} $absent"
    FAIL=$((FAIL+1))
  else
    echo -e "  ${GREEN}OK${RESET} $label"
    PASS=$((PASS+1))
  fi
}

section() { echo ""; echo -e "${CYAN}--- $1 ---${RESET}"; }

section "AUTH - Register"
R=$(curl -s -X POST "$BASE/auth/register" -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test_$$@example.com\",\"password\":\"test123\"}")
check        "POST /auth/register - token renvoyé"      '"token"'        "$R"
check_absent "POST /auth/register - sans password"      '"password"'     "$R"
TOKEN=$(echo "$R" | sed 's/.*"token":"\([^"]*\)".*/\1/')
USER_ID=$(echo "$R" | sed 's/.*"id":"\([^"]*\)".*/\1/')

R=$(curl -s -X POST "$BASE/auth/register" -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"email\":\"test_$$@example.com\",\"password\":\"test123\"}")
check "POST /auth/register - 409 email deja utilise" "already in use" "$R"

R=$(curl -s -X POST "$BASE/auth/register" -H "Content-Type: application/json" -d '{"email":"incomplete@example.com"}')
check "POST /auth/register - 400 champs manquants" "required" "$R"

section "AUTH - Login"
R=$(curl -s -X POST "$BASE/auth/login" -H "Content-Type: application/json" -d '{"email":"alice@movietreasures.com","password":"alice123"}')
check        "POST /auth/login - token renvoyé"     '"token"'    "$R"
check_absent "POST /auth/login - sans password"     '"password"' "$R"
ALICE_TOKEN=$(echo "$R" | sed 's/.*"token":"\([^"]*\)".*/\1/')

R=$(curl -s -X POST "$BASE/auth/login" -H "Content-Type: application/json" -d '{"email":"alice@movietreasures.com","password":"wrong"}')
check "POST /auth/login - 401 mauvais mot de passe" "Invalid email or password" "$R"

R=$(curl -s -X POST "$BASE/auth/login" -H "Content-Type: application/json" -d '{"email":"nobody@example.com","password":"test"}')
check "POST /auth/login - 401 email inconnu" "Invalid email or password" "$R"

section "AUTH - Me"
R=$(curl -s -X GET "$BASE/auth/me" -H "Authorization: Bearer $ALICE_TOKEN")
check        "GET /auth/me - 200 avec infos user" '"email"'    "$R"
check_absent "GET /auth/me - sans password"       '"password"' "$R"

R=$(curl -s -X GET "$BASE/auth/me")
check "GET /auth/me - 401 sans token" "Authentication failed" "$R"

R=$(curl -s -X GET "$BASE/auth/me" -H "Authorization: Bearer invalidtoken")
check "GET /auth/me - 401 token invalide" "message" "$R"

section "USERS - Lecture et Pagination"
R=$(curl -s -X GET "$BASE/users?page=1&limit=5" -H "Authorization: Bearer $ALICE_TOKEN")
check        "GET /users - pagination presente"  '"totalPages"' "$R"
check        "GET /users - limit=5 respecte"     '"limit":5'    "$R"
check_absent "GET /users - sans password"        '"password"'   "$R"

FIRST_ID=$(echo "$R" | grep -o '"id":"[^"]*"' | head -1 | sed 's/"id":"//;s/"//')
R=$(curl -s -X GET "$BASE/users/$FIRST_ID" -H "Authorization: Bearer $ALICE_TOKEN")
check        "GET /users/:id - 200 trouve"      '"email"'    "$R"
check_absent "GET /users/:id - sans password"   '"password"' "$R"

R=$(curl -s -X GET "$BASE/users/00000000-0000-0000-0000-000000000000" -H "Authorization: Bearer $ALICE_TOKEN")
check "GET /users/:id - 404 ID inexistant" "not found" "$R"

R=$(curl -s -X GET "$BASE/users")
check "GET /users - 401 sans token" "Authentication failed" "$R"

section "MOVIES - Creation"
R=$(curl -s -X POST "$BASE/movies" -H "Authorization: Bearer $ALICE_TOKEN" -H "Content-Type: application/json" -d '{"title":"Inception","releaseYear":2010,"genre":"Sci-Fi","director":"Christopher Nolan","rating":8.8}')
check "POST /movies - 201 cree avec id" '"id"' "$R"
MOVIE_ID=$(echo "$R" | sed 's/.*"id":"\([^"]*\)".*/\1/')

R=$(curl -s -X POST "$BASE/movies" -H "Authorization: Bearer $ALICE_TOKEN" -H "Content-Type: application/json" -d '{"title":"Incomplet"}')
check "POST /movies - 400 champs manquants" "required" "$R"

R=$(curl -s -X POST "$BASE/movies" -H "Content-Type: application/json" -d '{"title":"Test","releaseYear":2020,"genre":"Action","director":"Test"}')
check "POST /movies - 401 sans token" "Authentication failed" "$R"

section "MOVIES - Lecture"
R=$(curl -s -X GET "$BASE/movies?page=1&limit=10" -H "Authorization: Bearer $ALICE_TOKEN")
check "GET /movies - pagination presente" '"totalPages"' "$R"

R=$(curl -s -X GET "$BASE/movies/$MOVIE_ID" -H "Authorization: Bearer $ALICE_TOKEN")
check "GET /movies/:id - 200 trouve" '"Inception"' "$R"

R=$(curl -s -X GET "$BASE/movies/00000000-0000-0000-0000-000000000000" -H "Authorization: Bearer $ALICE_TOKEN")
check "GET /movies/:id - 404 ID inexistant" "Movie not found" "$R"

section "MOVIES - Recherche"
R=$(curl -s -X GET "$BASE/movies/search?title=inception" -H "Authorization: Bearer $ALICE_TOKEN")
check "GET /movies/search?title= - trouve" '"Inception"' "$R"

R=$(curl -s -X GET "$BASE/movies/search?genre=Sci-Fi" -H "Authorization: Bearer $ALICE_TOKEN")
check "GET /movies/search?genre= - trouve" '"Sci-Fi"' "$R"

R=$(curl -s -X GET "$BASE/movies/search?title=inception&genre=Sci-Fi" -H "Authorization: Bearer $ALICE_TOKEN")
check "GET /movies/search - combinaison title+genre" '"Inception"' "$R"

R=$(curl -s -X GET "$BASE/movies/search?title=xyznotexist" -H "Authorization: Bearer $ALICE_TOKEN")
check "GET /movies/search - vide si pas de match" '"data":[]' "$R"

R=$(curl -s -X GET "$BASE/movies/search?title=inception")
check "GET /movies/search - 401 sans token" "Authentication failed" "$R"

section "MOVIES - Mise a jour et Suppression"
R=$(curl -s -X PUT "$BASE/movies/$MOVIE_ID" -H "Authorization: Bearer $ALICE_TOKEN" -H "Content-Type: application/json" -d '{"rating":9.0,"description":"Un film de Nolan"}')
check "PUT /movies/:id - 200 mis a jour"        '"Inception"'      "$R"
check "PUT /movies/:id - description modifiee"  "Un film de Nolan" "$R"
check "PUT /movies/:id - rating mis a jour"     '"rating":9'       "$R"

R=$(curl -s -X DELETE "$BASE/movies/$MOVIE_ID" -H "Authorization: Bearer $ALICE_TOKEN")
check "DELETE /movies/:id - 200 supprime" "deleted successfully" "$R"

R=$(curl -s -X DELETE "$BASE/movies/$MOVIE_ID" -H "Authorization: Bearer $ALICE_TOKEN")
check "DELETE /movies/:id - 404 deja supprime" "message" "$R"

curl -s -X DELETE "$BASE/users/$USER_ID" -H "Authorization: Bearer $TOKEN" > /dev/null

echo ""
echo -e "${CYAN}----------------------------------${RESET}"
echo -e "  ${GREEN}OK $PASS passed${RESET}  ${RED}KO $FAIL failed${RESET}"
echo -e "${CYAN}----------------------------------${RESET}"
[ $FAIL -eq 0 ] && exit 0 || exit 1
