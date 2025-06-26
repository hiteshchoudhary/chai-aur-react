export declare namespace Models {
    /**
     * Documents List
     */
    type DocumentList<Document extends Models.Document> = {
        /**
         * Total number of documents documents that matched your query.
         */
        total: number;
        /**
         * List of documents.
         */
        documents: Document[];
    };
    /**
     * Sessions List
     */
    type SessionList = {
        /**
         * Total number of sessions documents that matched your query.
         */
        total: number;
        /**
         * List of sessions.
         */
        sessions: Session[];
    };
    /**
     * Identities List
     */
    type IdentityList = {
        /**
         * Total number of identities documents that matched your query.
         */
        total: number;
        /**
         * List of identities.
         */
        identities: Identity[];
    };
    /**
     * Logs List
     */
    type LogList = {
        /**
         * Total number of logs documents that matched your query.
         */
        total: number;
        /**
         * List of logs.
         */
        logs: Log[];
    };
    /**
     * Files List
     */
    type FileList = {
        /**
         * Total number of files documents that matched your query.
         */
        total: number;
        /**
         * List of files.
         */
        files: File[];
    };
    /**
     * Teams List
     */
    type TeamList<Preferences extends Models.Preferences> = {
        /**
         * Total number of teams documents that matched your query.
         */
        total: number;
        /**
         * List of teams.
         */
        teams: Team<Preferences>[];
    };
    /**
     * Memberships List
     */
    type MembershipList = {
        /**
         * Total number of memberships documents that matched your query.
         */
        total: number;
        /**
         * List of memberships.
         */
        memberships: Membership[];
    };
    /**
     * Executions List
     */
    type ExecutionList = {
        /**
         * Total number of executions documents that matched your query.
         */
        total: number;
        /**
         * List of executions.
         */
        executions: Execution[];
    };
    /**
     * Countries List
     */
    type CountryList = {
        /**
         * Total number of countries documents that matched your query.
         */
        total: number;
        /**
         * List of countries.
         */
        countries: Country[];
    };
    /**
     * Continents List
     */
    type ContinentList = {
        /**
         * Total number of continents documents that matched your query.
         */
        total: number;
        /**
         * List of continents.
         */
        continents: Continent[];
    };
    /**
     * Languages List
     */
    type LanguageList = {
        /**
         * Total number of languages documents that matched your query.
         */
        total: number;
        /**
         * List of languages.
         */
        languages: Language[];
    };
    /**
     * Currencies List
     */
    type CurrencyList = {
        /**
         * Total number of currencies documents that matched your query.
         */
        total: number;
        /**
         * List of currencies.
         */
        currencies: Currency[];
    };
    /**
     * Phones List
     */
    type PhoneList = {
        /**
         * Total number of phones documents that matched your query.
         */
        total: number;
        /**
         * List of phones.
         */
        phones: Phone[];
    };
    /**
     * Locale codes list
     */
    type LocaleCodeList = {
        /**
         * Total number of localeCodes documents that matched your query.
         */
        total: number;
        /**
         * List of localeCodes.
         */
        localeCodes: LocaleCode[];
    };
    /**
     * Document
     */
    type Document = {
        /**
         * Document ID.
         */
        $id: string;
        /**
         * Collection ID.
         */
        $collectionId: string;
        /**
         * Database ID.
         */
        $databaseId: string;
        /**
         * Document creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Document update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Document permissions. [Learn more about permissions](https://appwrite.io/docs/permissions).
         */
        $permissions: string[];
        [key: string]: any;
    };
    /**
     * Log
     */
    type Log = {
        /**
         * Event name.
         */
        event: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * User Email.
         */
        userEmail: string;
        /**
         * User Name.
         */
        userName: string;
        /**
         * API mode when event triggered.
         */
        mode: string;
        /**
         * IP session in use when the session was created.
         */
        ip: string;
        /**
         * Log creation date in ISO 8601 format.
         */
        time: string;
        /**
         * Operating system code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/os.json).
         */
        osCode: string;
        /**
         * Operating system name.
         */
        osName: string;
        /**
         * Operating system version.
         */
        osVersion: string;
        /**
         * Client type.
         */
        clientType: string;
        /**
         * Client code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/clients.json).
         */
        clientCode: string;
        /**
         * Client name.
         */
        clientName: string;
        /**
         * Client version.
         */
        clientVersion: string;
        /**
         * Client engine name.
         */
        clientEngine: string;
        /**
         * Client engine name.
         */
        clientEngineVersion: string;
        /**
         * Device name.
         */
        deviceName: string;
        /**
         * Device brand name.
         */
        deviceBrand: string;
        /**
         * Device model name.
         */
        deviceModel: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        countryCode: string;
        /**
         * Country name.
         */
        countryName: string;
    };
    /**
     * User
     */
    type User<Preferences extends Models.Preferences> = {
        /**
         * User ID.
         */
        $id: string;
        /**
         * User creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * User update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * User name.
         */
        name: string;
        /**
         * Hashed user password.
         */
        password?: string;
        /**
         * Password hashing algorithm.
         */
        hash?: string;
        /**
         * Password hashing algorithm configuration.
         */
        hashOptions?: object;
        /**
         * User registration date in ISO 8601 format.
         */
        registration: string;
        /**
         * User status. Pass `true` for enabled and `false` for disabled.
         */
        status: boolean;
        /**
         * Labels for the user.
         */
        labels: string[];
        /**
         * Password update time in ISO 8601 format.
         */
        passwordUpdate: string;
        /**
         * User email address.
         */
        email: string;
        /**
         * User phone number in E.164 format.
         */
        phone: string;
        /**
         * Email verification status.
         */
        emailVerification: boolean;
        /**
         * Phone verification status.
         */
        phoneVerification: boolean;
        /**
         * User preferences as a key-value object
         */
        prefs: Preferences;
        /**
         * Most recent access date in ISO 8601 format. This attribute is only updated again after 24 hours.
         */
        accessedAt: string;
    };
    /**
     * AlgoMD5
     */
    type AlgoMd5 = {
        /**
         * Algo type.
         */
        type: string;
    };
    /**
     * AlgoSHA
     */
    type AlgoSha = {
        /**
         * Algo type.
         */
        type: string;
    };
    /**
     * AlgoPHPass
     */
    type AlgoPhpass = {
        /**
         * Algo type.
         */
        type: string;
    };
    /**
     * AlgoBcrypt
     */
    type AlgoBcrypt = {
        /**
         * Algo type.
         */
        type: string;
    };
    /**
     * AlgoScrypt
     */
    type AlgoScrypt = {
        /**
         * Algo type.
         */
        type: string;
        /**
         * CPU complexity of computed hash.
         */
        costCpu: number;
        /**
         * Memory complexity of computed hash.
         */
        costMemory: number;
        /**
         * Parallelization of computed hash.
         */
        costParallel: number;
        /**
         * Length used to compute hash.
         */
        length: number;
    };
    /**
     * AlgoScryptModified
     */
    type AlgoScryptModified = {
        /**
         * Algo type.
         */
        type: string;
        /**
         * Salt used to compute hash.
         */
        salt: string;
        /**
         * Separator used to compute hash.
         */
        saltSeparator: string;
        /**
         * Key used to compute hash.
         */
        signerKey: string;
    };
    /**
     * AlgoArgon2
     */
    type AlgoArgon2 = {
        /**
         * Algo type.
         */
        type: string;
        /**
         * Memory used to compute hash.
         */
        memoryCost: number;
        /**
         * Amount of time consumed to compute hash
         */
        timeCost: number;
        /**
         * Number of threads used to compute hash.
         */
        threads: number;
    };
    /**
     * Preferences
     */
    type Preferences = {
        [key: string]: any;
    };
    /**
     * Session
     */
    type Session = {
        /**
         * Session ID.
         */
        $id: string;
        /**
         * Session creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Session expiration date in ISO 8601 format.
         */
        expire: string;
        /**
         * Session Provider.
         */
        provider: string;
        /**
         * Session Provider User ID.
         */
        providerUid: string;
        /**
         * Session Provider Access Token.
         */
        providerAccessToken: string;
        /**
         * The date of when the access token expires in ISO 8601 format.
         */
        providerAccessTokenExpiry: string;
        /**
         * Session Provider Refresh Token.
         */
        providerRefreshToken: string;
        /**
         * IP in use when the session was created.
         */
        ip: string;
        /**
         * Operating system code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/os.json).
         */
        osCode: string;
        /**
         * Operating system name.
         */
        osName: string;
        /**
         * Operating system version.
         */
        osVersion: string;
        /**
         * Client type.
         */
        clientType: string;
        /**
         * Client code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/clients.json).
         */
        clientCode: string;
        /**
         * Client name.
         */
        clientName: string;
        /**
         * Client version.
         */
        clientVersion: string;
        /**
         * Client engine name.
         */
        clientEngine: string;
        /**
         * Client engine name.
         */
        clientEngineVersion: string;
        /**
         * Device name.
         */
        deviceName: string;
        /**
         * Device brand name.
         */
        deviceBrand: string;
        /**
         * Device model name.
         */
        deviceModel: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        countryCode: string;
        /**
         * Country name.
         */
        countryName: string;
        /**
         * Returns true if this the current user session.
         */
        current: boolean;
    };
    /**
     * Identity
     */
    type Identity = {
        /**
         * Identity ID.
         */
        $id: string;
        /**
         * Identity creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Identity update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Identity Provider.
         */
        provider: string;
        /**
         * ID of the User in the Identity Provider.
         */
        providerUid: string;
        /**
         * Email of the User in the Identity Provider.
         */
        providerEmail: string;
        /**
         * Identity Provider Access Token.
         */
        providerAccessToken: string;
        /**
         * The date of when the access token expires in ISO 8601 format.
         */
        providerAccessTokenExpiry: string;
        /**
         * Identity Provider Refresh Token.
         */
        providerRefreshToken: string;
    };
    /**
     * Token
     */
    type Token = {
        /**
         * Token ID.
         */
        $id: string;
        /**
         * Token creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Token secret key. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
         */
        secret: string;
        /**
         * Token expiration date in ISO 8601 format.
         */
        expire: string;
    };
    /**
     * JWT
     */
    type Jwt = {
        /**
         * JWT encoded string.
         */
        jwt: string;
    };
    /**
     * Locale
     */
    type Locale = {
        /**
         * User IP address.
         */
        ip: string;
        /**
         * Country code in [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) two-character format
         */
        countryCode: string;
        /**
         * Country name. This field support localization.
         */
        country: string;
        /**
         * Continent code. A two character continent code &quot;AF&quot; for Africa, &quot;AN&quot; for Antarctica, &quot;AS&quot; for Asia, &quot;EU&quot; for Europe, &quot;NA&quot; for North America, &quot;OC&quot; for Oceania, and &quot;SA&quot; for South America.
         */
        continentCode: string;
        /**
         * Continent name. This field support localization.
         */
        continent: string;
        /**
         * True if country is part of the European Union.
         */
        eu: boolean;
        /**
         * Currency code in [ISO 4217-1](http://en.wikipedia.org/wiki/ISO_4217) three-character format
         */
        currency: string;
    };
    /**
     * LocaleCode
     */
    type LocaleCode = {
        /**
         * Locale codes in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
         */
        code: string;
        /**
         * Locale name
         */
        name: string;
    };
    /**
     * File
     */
    type File = {
        /**
         * File ID.
         */
        $id: string;
        /**
         * Bucket ID.
         */
        bucketId: string;
        /**
         * File creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * File update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * File permissions. [Learn more about permissions](https://appwrite.io/docs/permissions).
         */
        $permissions: string[];
        /**
         * File name.
         */
        name: string;
        /**
         * File MD5 signature.
         */
        signature: string;
        /**
         * File mime type.
         */
        mimeType: string;
        /**
         * File original size in bytes.
         */
        sizeOriginal: number;
        /**
         * Total number of chunks available
         */
        chunksTotal: number;
        /**
         * Total number of chunks uploaded
         */
        chunksUploaded: number;
    };
    /**
     * Team
     */
    type Team<Preferences extends Models.Preferences> = {
        /**
         * Team ID.
         */
        $id: string;
        /**
         * Team creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Team update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Team name.
         */
        name: string;
        /**
         * Total number of team members.
         */
        total: number;
        /**
         * Team preferences as a key-value object
         */
        prefs: Preferences;
    };
    /**
     * Membership
     */
    type Membership = {
        /**
         * Membership ID.
         */
        $id: string;
        /**
         * Membership creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Membership update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * User name.
         */
        userName: string;
        /**
         * User email address.
         */
        userEmail: string;
        /**
         * Team ID.
         */
        teamId: string;
        /**
         * Team name.
         */
        teamName: string;
        /**
         * Date, the user has been invited to join the team in ISO 8601 format.
         */
        invited: string;
        /**
         * Date, the user has accepted the invitation to join the team in ISO 8601 format.
         */
        joined: string;
        /**
         * User confirmation status, true if the user has joined the team or false otherwise.
         */
        confirm: boolean;
        /**
         * User list of roles
         */
        roles: string[];
    };
    /**
     * Execution
     */
    type Execution = {
        /**
         * Execution ID.
         */
        $id: string;
        /**
         * Execution creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Execution upate date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Execution roles.
         */
        $permissions: string[];
        /**
         * Function ID.
         */
        functionId: string;
        /**
         * The trigger that caused the function to execute. Possible values can be: `http`, `schedule`, or `event`.
         */
        trigger: string;
        /**
         * The status of the function execution. Possible values can be: `waiting`, `processing`, `completed`, or `failed`.
         */
        status: string;
        /**
         * HTTP request method type.
         */
        requestMethod: string;
        /**
         * HTTP request path and query.
         */
        requestPath: string;
        /**
         * HTTP response headers as a key-value object. This will return only whitelisted headers. All headers are returned if execution is created as synchronous.
         */
        requestHeaders: Headers[];
        /**
         * HTTP response status code.
         */
        responseStatusCode: number;
        /**
         * HTTP response body. This will return empty unless execution is created as synchronous.
         */
        responseBody: string;
        /**
         * HTTP response headers as a key-value object. This will return only whitelisted headers. All headers are returned if execution is created as synchronous.
         */
        responseHeaders: Headers[];
        /**
         * Function logs. Includes the last 4,000 characters. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
         */
        logs: string;
        /**
         * Function errors. Includes the last 4,000 characters. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
         */
        errors: string;
        /**
         * Function execution duration in seconds.
         */
        duration: number;
    };
    /**
     * Country
     */
    type Country = {
        /**
         * Country name.
         */
        name: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        code: string;
    };
    /**
     * Continent
     */
    type Continent = {
        /**
         * Continent name.
         */
        name: string;
        /**
         * Continent two letter code.
         */
        code: string;
    };
    /**
     * Language
     */
    type Language = {
        /**
         * Language name.
         */
        name: string;
        /**
         * Language two-character ISO 639-1 codes.
         */
        code: string;
        /**
         * Language native name.
         */
        nativeName: string;
    };
    /**
     * Currency
     */
    type Currency = {
        /**
         * Currency symbol.
         */
        symbol: string;
        /**
         * Currency name.
         */
        name: string;
        /**
         * Currency native symbol.
         */
        symbolNative: string;
        /**
         * Number of decimal digits.
         */
        decimalDigits: number;
        /**
         * Currency digit rounding.
         */
        rounding: number;
        /**
         * Currency code in [ISO 4217-1](http://en.wikipedia.org/wiki/ISO_4217) three-character format.
         */
        code: string;
        /**
         * Currency plural name
         */
        namePlural: string;
    };
    /**
     * Phone
     */
    type Phone = {
        /**
         * Phone code.
         */
        code: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        countryCode: string;
        /**
         * Country name.
         */
        countryName: string;
    };
    /**
     * Headers
     */
    type Headers = {
        /**
         * Header name.
         */
        name: string;
        /**
         * Header value.
         */
        value: string;
    };
}
