# Car Rental Alkalmazás
## I. Feladat ismertetése
Autóbérlést lehetővé tevő alkalmazás.

## Funkcionális követelmények:
-- **Vendégként**:
-   szeretnék regisztrálni az oldalra --> Regisztráció
-   szeretnék bejelentkezni az oldalra --> Bejelentkezés

-- **Felhasználóként**:
-   szeretném megtekinteni az elérhető járműveket --> Elérhető járművek listázása
-   szeretném megtekinteni a kiválasztható telephelyeket --> Lokációk listázása
-   szeretnék kibérelni egy elérhető járművet --> Autóbérlés
-   szeretném megtekinteni az aktív, valamint korábbi bérléseim --> Bérlések listázása
-   szeretném az aktív bérlésem lezárni --> Bérlés zárása

-- **Adminisztrátorként**:
-   Adminisztrátorként szeretném látni az összes bérlést. --> Bérlések listázása
-   Adminisztrátorként szeretnék új járművet létrehozni/módosítani/törölni --> Jármű létrehozása, szerkesztése, törlése
-    Adminisztrátorként szeretnék új kategóriát létrehozni --> Kategória létrehozása
-    Adminisztrátorként szeretnék új autómárkát létrehozni/módosítani/törölni --> Autómárka létrehozása, szerkesztése, törlése
-    Adminisztrátorként szeretnék új modellt létrehozni/módosítani --> modell létrehozása, szerkesztése

## Nem funkcionális követelmények:
-   Felhasználóbarát, ergonomikus elrendezés és kinézet.
-   Gyors működés.
-   Biztonságos működés: jelszavak tárolása, funkciókhoz való hozzáférés.

## Szerepkörök

-   Vendég: a főoldal tartalmához fér hozzá.
-   Bérlő: a vendég szerepkörén túl látja az elérhető járműveket, valamint bérlést tud indítani/zárni.
-   Adminisztrátor: a bérlő szerepkörén túl az összes bérlést látja, módosíthatja.

## Adatbázis séma:
![alt text](https://github.com/jkornel44/fullstack-21-22-2-car-rental/blob/master/ER.png?raw=true)

## UML Use Case Diagram:
![alt text](https://github.com/jkornel44/fullstack-21-22-2-car-rental/blob/master/usecases.png?raw=true)