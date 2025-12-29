import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function ClubHistoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-[400px] w-full overflow-hidden">
          <Image
            src="/sptc_history.jpg"
            alt="Historic Saint Paul Tennis Club"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">A Brief History of the St. Paul Tennis Club</h1>
          <p className="text-sm text-muted-foreground mb-12">1912-2021 | Updated January 2022 by Patricia McMorrow</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              This brief history of the St. Paul Tennis Club, first assembled in the 1960s by members Jean Gehan and
              Otis Godfrey Jr., is updated on an ongoing basis with bits and pieces of information gleaned from
              conversations with longtime members and neighborhood residents, newspaper clippings, photo archives and
              many fond memories. As some of the information may possibly be inaccurate or need additional detail,
              please feel free to add to the story by contacting us.
            </p>

            <section>
              <h2 className="text-2xl font-bold mb-4">Promotion of the Game of Tennis</h2>
              <p className="mb-4 leading-relaxed">
                The St. Paul Tennis Club was incorporated August 21, 1912. Its Articles of Incorporation, registered
                with Minnesota Secretary of State Julius Schmall, state that the club was organized for "The promotion
                of the game of tennis, and the affording of facilities to members of the club for the playing of said
                game, including the requisition by lease, purchase, gift, or devise of any and all property, real or
                personal therefore." The names of the incorporates were: John Hersey Wheeler; John S. Dodson; Aldred G.
                Norris; Donald P. Haynie; Martin P. Coonan; Howard W. Kingston; and Joseph Thomson.
              </p>
              <p className="leading-relaxed">
                The incorporation document was among the possessions of Myra McGee, whose late husband, John McGee, was
                one of the tennis enthusiasts who helped build the club. The land on which the four tennis courts and
                the original clubhouse were built belonged to a man named Walter Coller. Tradition has it that he
                donated the land to the club. After the title to Coller's land was obtained, master clay-court builder
                Arnt Grindheim created the courts. Upon completion, Arnt, who happened to live in the house directly
                west of the club, became a vigilant caretaker. Every day, the courts were rolled with a hand-roller,
                dragged and relined. No one stepped a foot on the courts until Arnt gave the go-ahead.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Courtside, 1920-1940</h2>
              <p className="mb-4 leading-relaxed">
                The original clubhouse was a one-story clapboard structure that included a shower and toilet for the
                men. Minimal facilities for women were added later. A screened porch furnished with a few tables and
                chairs ran across the side of the clubhouse facing the courts. This provided a social center for people
                waiting for courts, and a pleasant space for the younger set to play cards and argue over the finer
                points of tennis form. Arnt kept a supply of cold pop in an ice locker in a small area where he also
                strung racquets. If Arnt was in a festive mood, he provided shaved ice as a treat.
              </p>
              <p className="leading-relaxed">
                The clubhouse was later rebuilt, and somewhat enlarged. During this period, about 1920 to 1940, the club
                flourished. After work and on weekends, men played tennis in long, white pants and long-sleeved white
                shirts. Slowly, styles changed, and a few brave souls began to play in white shorts, including Joe
                Goswitz, known as a fashion trendsetter in his day. Some of the names from this era include: Pegs
                Albright, Marguerite Davis, Myron Hutchinson, Wells Farnum, Charles Britzius (father of former club pro
                Glen Britzius) and Joe Armstrong.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">State Tournament Action</h2>
              <p className="leading-relaxed">
                The big event of each summer was the State Tournament, during which the club fences were covered with
                canvas and admission was charged for spectators. A small grandstand was erected along Court 1 for the
                finals. The most colorful player to enter the tournaments was John Hennessey, who seemed to win every
                time he played. Hennessey's credentials included competing on the Davis Cup team with George Lott, and a
                legendary victory over Bill Tilden, who was ranked No. 1 in the world for seven years during the 1920s.
                Hennessey would show up for the State Tournament finals wearing several sweaters that he shed, one at a
                time, as his matches wore on. He used a large, wooden racquet that looked like an antique—even in the
                1920s. In those days, even the best players had to maintain amateur status to participate in big
                tournaments. This meant many top players were dead broke, and had to rely on the good will of tennis
                fans for sponsorship of housing and travel expenses. Much of the top talent landed in St. Paul for the
                State Tournament, and club members witnessed many exciting matches on the clay courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Days of Davis & Kesting</h2>
              <p className="mb-4 leading-relaxed">
                Not many women played tennis competitively in the club's early days. This made Marguerite Davis even
                more spectacular to behold. She first won the women's singles division of the State Tournament in 1911,
                at the age of 21. And she won every consecutive year until 1933, when she lost to Elizabeth Kesting,
                also a member of the club. Davis' nephew, John Harrison, said his aunt was once ranked No. 12 in the
                United States, and she played against the legendary Helen Moody in 1921. Davis and Kesting were both
                later inducted into the Minnesota Tennis Hall of Fame, now called the USTA Northern Hall of Fame. (Davis
                in 1987 and Kesting-Harris in 2002.)
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">More on Marguerite Davis</h2>
              <p className="leading-relaxed">
                Fondly known as "Mugs" or "Mugsy," Marguerite Davis was born in 1890. She was a student at Mrs. Backus'
                School for Girls, at 586 Holly Ave., where she met her friend Alice O'Brien. Their wartime adventures as
                American Red Cross volunteers in Europe are captured in the 2017 book, "Alice in France: The World War I
                Letters of Alice M. O'Brien," edited by Alice's grandniece and club member Nancy O'Brien Wagner. Mugsy
                was a generous supporter of the club, and also of 1959 Wimbledon doubles champion Jeanne Arth, whose
                family, like most, was not in a financial position to manage the expenses of national and international
                competition. Mugsy, who never married and ran a travel agency in downtown St. Paul, continued to play on
                the clay, often on Sunday afternoons, well into her later years. After her death on March 16, 1963,
                Mugsy's family donated to the Minnesota History Center a sterling trophy from the 1907 Minnesota State
                Lawn Tennis Championship for women's doubles and a woven cloth trophy from the 1919 Northwest Lawn
                Tennis Championship.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Pandemics of 1918 & 2020</h2>
              <p className="mb-4 leading-relaxed">
                In 1918, Mugsy and Alice were among a group of school friends who traveled to France to serve as
                mechanics and hospital and canteen workers during World War I. Mugsy returned home to St. Paul in
                January 1919, after the surrender of Germany on Nov. 11, 1918, to find Minnesota being ravaged by the
                mis-named "Spanish Flu." Between September 1918 and January 1919, more than 10,000 Minnesotans died of
                influenza—1,180 of them St. Paul residents. In the 2018 book titled, "Minnesota 1918: When Flu, Fire,
                and War Ravaged the State," Curt Brown, a longtime Osceola Avenue resident, wrote that St. Paul was more
                resistant to imposing public-health restrictions than Minneapolis. But a citywide order on Nov. 6, 1918,
                closed schools, churches, bars and many businesses. Public gatherings were banned, except for work
                related to the war effort. The outbreak tapered off in early 1919, and by the time the club opened for
                the summer season, it was business as usual.
              </p>
              <p className="leading-relaxed">
                That was not the case, though, with the coronavirus pandemic in 2020, which affected SPTC operations in
                many ways. Following health and safety guidance from the Office of the Governor and other sources, club
                manager Gary Grey and the SPTC board of directors implemented social-distancing, mask-wearing, cleaning
                and programming protocols. With reduced capacity in the pool and on the courts to minimize virus spread,
                it was a summer where flexibility and patience came into play. The typical season staff includes about
                20 college and high school students, but in 2020 a "Gang of Four" (Tor Cox, Emily Hite, Rory King and
                Gracie Munson-Regala) kept the club running in alignment with pandemic rules, as directed by Gary. This
                small team, all SPTC members since they were young kids, was central to reducing virus spread by keeping
                staff numbers low. When state health guidelines permitted opening of the pool in late June, a few more
                lifeguards were added to the roster. SPTC never had to close in 2020 due to staff exposure or to
                contracting the virus. The club also remained open throughout the 2021 season, with continued vigilance
                and adherence to evolving health guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">The Olympic Skating Rink</h2>
              <p className="mb-4 leading-relaxed">
                In the 1940s and 1950s, the club's tennis courts were flooded-and-frozen in winter, transforming the red
                clay into "The Olympic Skating Rink." Members and friends remember ice skating out under the stars to
                songs like "Mr. Sandman," by the Chordettes, and other favorites, played over a loudspeaker rigged to
                the clubhouse. Michael E. Murphy, who lived at 1069 Fairmount Ave. from 1941 to 1976, re-creates this
                magical time in his 2106 collection of poems, "Songs of Crocus Hill." In "Winter Dreams at the Club," a
                copy of which is on display in the clubhouse, Mike writes of club manager Ted Dwyer, "taking our
                quarters for the skating, our dimes for the pop and candy, his half-smile a reminder he'll throw us out
                into the black night for fighting or cussing."
              </p>
              <p className="leading-relaxed">
                Another poem in the collection, titled, "Mr. Grindheim" is a tribute to the man who built and cared for
                the clay courts for decades. Mike also has fond memories of Radisky's Linwood Sweetshop—now a duplex
                adjacent to Court 4—and in "Yo-Yo Wayne" memorializes a yo-yo salesman doing tricks with a Duncan on the
                wide stoop in front of the shop. For many years, members from this era enjoyed an annual "Old Clubbers"
                luncheon at The Lex. Attendees almost always included: Mike, the Arth siblings (Tom and Jeanne), Bob
                Haugh, Hezzy Burke, Gus Metzger and Danny Dwyer, son of the legendary club manager. Beautiful images of
                The Olympic are also captured in Patricia Hampl's 2018 memoir, "The Art of the Wasted Day." An
                internationally acclaimed writer, educator and MacArthur and Googenheim fellow, Trish grew up across the
                street from the club. In one lovely passage, she writes, "We're skating separately, boys zig-zagging on
                their blunt hockey skates, practicing slap shots with their sticks, girls treading along in white boots
                whose slim blades have toe picks that look as if the metal were cut with pinking shears. We skate, five
                girls in a row, holding hands."
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">The Arth Era</h2>
              <p className="mb-4 leading-relaxed">
                A decline in club membership began in the mid-1940s, likely associated with the World War II climate.
                Although membership continued to dwindle in the 1950s, it was nevertheless a hugely proud decade for the
                club because of the incredible talent of Jeanne Arth. Celebrated as one of Sports Illustrated's 50
                Greatest Minnesota Sports Figures of the 20th Century, Jeanne grew up at 1083 Osceola Ave., just west of
                the club. She and her sister, Shirley, learned to play tennis under the watchful eye of club caretaker
                and instructor Louie Soukup, and were supported and cheered on by many members of the club through the
                years.
              </p>
              <p className="leading-relaxed">
                Court 1 was dedicated to Jeanne in 2010, with a plaque on permanent display featuring a picture of her
                in pigtails and holding a racquet nearly as big as she was. Jeanne's most recent visits to the club were
                in July 2018, to share stories at a "Wimbledon Breakfast," and in August 2020, for filming of a
                documentary on her career by club member Bobak Razavi, a teacher and tennis coach at St. Paul Academy,
                and his students. The event was coordinated by tennis director Greg Hiers, who remembers meeting Jeanne
                soon after he came to the club in 1997. She had given up tennis for golf by then, but Greg remembers
                thinking how amazing it would have been to have a chance to hit with a Wimbledon champion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">The First Renaissance</h2>
              <p className="mb-4 leading-relaxed">
                While Jeanne was leaving her mark on the tennis world, a long series of events and benign neglect had
                reduced club membership to six by 1959: Ted Dwyer, who had served as president for about 20 years;
                Marguerite Davis; George Evens; Mrs. Fred Weyerhaeuser; and Harry and Dick Ryan, who ran the St. Paul
                Milk Company. It seemed there had not been a membership meeting or election of officers since before the
                start of World War II. But on the evening of Aug. 20, 1959, the tide turned. John Greenman was elected
                president, and the newly elected board voted to hire an architect and develop plans for a new clubhouse
                and a pool.
              </p>
              <p className="mb-4 leading-relaxed">
                An enthusiastic and successful membership drive launched early in 1960, with 100 individuals and
                families added to the club membership. Plus: Arnt Grindheim came out of retirement to serve as club
                manager, maintaining the courts he had laid down himself in 1913. By spring 1961, all 300 shares of
                stock in the club had been sold, generating sufficient capital for improvements. The board also entered
                into delicate negotiations to purchase the lot directly west of the club, on which the Grindheim home
                was built. The plan included relocating the Grindheim home from Osceola Avenue to the north side of
                Fairmount Avenue, between Victoria and Avon Streets, where it still stands. The spectacle of moving an
                entire house was imagined, with a few artistic liberties, in a Michael E. Murphy poem titled, "A Second
                Crossing," that is included in "Songs of Crocus Hill."
              </p>
              <p className="leading-relaxed">
                In the fall of 1961, members hosted a "farewell party" for the old clubhouse. Some in attendance
                described the event as "joyous, raucous or even out of control, but no arrests were made."
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1960s: In the Swim of Things</h2>
              <p className="mb-4 leading-relaxed">
                With the new pool and clubhouse—which included showers!—the club was again the place to be in St. Paul.
                Joe Raymond became club manager and the first swim coach. He soon developed swimmers who became
                inter-club champions, much to the dismay of clubs with year-around swimming. Tennis activities likewise
                increased, in volume and quantity of play. Club news was regularly covered in the sports and society
                sections of the St. Paul Pioneer Press and St. Paul Dispatch. Photographs from the 1960s feature members
                in tennis whites, sitting in canvas chairs, casually enjoying cigarettes. Popular names from the 1960s
                include the Corrigans, Greenmans, Gehans, McCartneys, McGees, O'Briens, Plunketts and Suttons.
              </p>
              <p className="mb-4 leading-relaxed">
                One fun photo published in the Dispatch on July 15, 1968, captures the "Second Annual Lawn Social"
                hosted by Karl V. Klein, who lived at 1056 Fairmount Ave., across the alley from the clay courts. Karl
                dressed in coat-and-tails and top hat to entertain his guests, a group of women who were regular players
                at the club. The photo caption reads, "The luncheon was given with the blessings of Mrs. Klein, and both
                guests and hosts agreed it would be an annual event."
              </p>
              <p className="leading-relaxed">
                In the 1960s, witty club members also produced a hilarious newsletter titled The Racqueteer. Snippets
                from the May 1963 edition include recipes for cocktails named, "The Half Volley" and "Half-Gainer," and
                an "Ask Sadie" advice column, seemingly for the lovelorn. An annual awards list included: Crabbiest at
                the Pool: Joe Goswitz; Most Effective Serve: Pat Corrigan; Most Happy-Go-Lucky Irishman: Mike O'Brien;
                Least Distracting Serve: Jean Baker.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Olson & King</h2>
              <p className="mb-4 leading-relaxed">
                Leonard "Bucky" Olson was lured from the plush surroundings of Town & Country Club to the friendly
                confines of Osceola Avenue in the 1960s, and is remembered as one of the club's favorite tennis pros.
                Bucky's widow, Shirley Olson Graham, who died at age 95 in December 2020, said many of her family's
                happiest memories were from the club days. Bucky loved tennis, Shirley said, but he loved the friendship
                and fun of the club just as much. Shirley kept a cartoon from a 1970s edition of one of the St. Paul
                newspapers, showing a player with a panicky expression on his face being carried off the court. The
                caption reads, "He's been stiff like this since he learned he's gotta play Bucky Olson in the first
                round."
              </p>
              <p className="mb-4 leading-relaxed">
                When Bucky died unexpectedly, St. Paul Pioneer Press sports columnist Don Riley wrote, "The world lost a
                friend in tennis pro Bucky Olson. He had a sensitivity to peoples' needs that far exceeded the domain of
                his courts and schoolrooms." Bucky's legacy lives on, though, with his son, David, working as a tennis
                instructor. In fact, David was featured in the Highland Villager newspaper in July 2011 while coaching a
                program on the Bucky Olson Tennis Courts at Central High school.
              </p>
              <p className="leading-relaxed">
                John King, a contemporary of Bucky's, is another proud credit to the club's history. John was a teaching
                pro at the club, but is perhaps more well known for developing urban youth tennis programs in the Twin
                Cities. In 1970, he teamed with Jack Thommen and Bob Speed to launch the Minneapolis Urban Tennis
                Program, and in 1989 started the St. Paul Urban Tennis Program.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Gary Grey: Club Manager, Hawkeyes Fan</h2>
              <p className="leading-relaxed">
                When Eisenhower (Hopkins) High School teacher and swim coach Gary Grey responded to an ad in the Sunday
                newspaper in 1984 for a "club manager and swimming coach," he thought it might be an interesting summer
                position. He and Pat Brynteson, club president at the time, agreed that Gary would accept the job in the
                short-term, and see how things worked out. Fast-forward millions of laps and hundreds of swim meets over
                what turned out to be a remarkable 38-year tenure. When Gary retired from the club at the end of the
                2021 season, the outpouring of gratitude was immense from generations of kids he had taught to swim and
                also coached—some of whom performed quite respectably at the high school and college levels. Gary was
                also the first boss for many young lifeguards and maintenance workers at the club, and he will always be
                remembered for the heart and soul he put into making the club a safe and happy place for families.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">The Second Renaissance</h2>
              <p className="mb-4 leading-relaxed">
                While Gary and tennis director Greg Hiers have always taken excellent care of the pool and the courts,
                time and weather nonetheless take a toll. The pool that was new in the early 1960s had developed some
                cracks and leaks around 2010, and by 2015 the decision to repair or replace was becoming urgent. Dan
                Kennedy was club president at the time, and led what became a three-year, $1.7 million project to build
                a new pool, clubhouse, rooftop deck, office area and bathroom/shower facility. Members also voted to
                install an underground watering system for the courts, resurface the green har-tru and replace all
                fencing except the easternmost fence. (During this portion of the work, one corner of the original 1913
                clay on Court 1 was glimpsed, with original lines intact!)
              </p>
              <p className="mb-4 leading-relaxed">
                The project was a tremendous undertaking for a volunteer board of directors and other members who
                generously gave of their time and expertise in areas including finance, law, architecture, engineering,
                design, landscaping and navigating building requirements of the City of St. Paul and its Heritage
                Preservation Commission. Naming all those who love the club and made the project possible would make for
                a very long list, but Dan, Eduardo Barrera (who today lives in the Arth family home), Mike Christianson,
                Robert King and John Tuttle may have managed a billion details among them.
              </p>
              <p className="leading-relaxed">
                At the grand re-opening of the club on May 26, 2018, current members, past members and neighbors
                celebrated the dedication of the Gary Grey Pool as well Court 2 (The Kennedy Family Court, dedicated in
                honor of Dr. William and Marla Kennedy), Court 3 (The Doris Bernhard Thomas Memorial Court) and Court 4
                (The Ferguson/Rinkoff Family court, dedicated in honor of Julia Ferguson and Richard Rinkoff).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Today, Tomorrow & Beyond</h2>
              <p className="mb-4 leading-relaxed">
                In 1914, one share of St. Paul Tennis Club stock was valued at $15. In 1980, one share was valued at
                $200. Today, the value has grown ten-fold. And while club membership had declined to six in 1959, the
                wait to become a member is now five-to-ten years long. Another development: As part of the 2018
                reconstruction project, a capital fund was established, with an eye toward future maintenance and
                repair.
              </p>
              <p className="leading-relaxed">
                The club foundations and traditions established in 1912 by John McGee and Arnt Grindheim are continued
                today. We owe a debt of gratitude to generations of club members for the spirit that pervades the
                friendly neighborhood spot we call the St. Paul Tennis Club. Long may it continue.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
