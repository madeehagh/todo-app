const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

@Table
export class Shoe extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column
    id: string;

    @Equals('lala')
    @Column
    readonly key: string;

    @Contains('Special')
    @Column
    special: string;

    @Length({ min: 3, max: 15 })
    @Column
    brand: string;

    @IsUrl
    @Column
    brandUrl: string;

    @Is('HexColor', (value) => {
        if (!HEX_REGEX.test(value)) {
            throw new Error(`"${value}" is not a hex color value.`);
        }
    })
    @Column
    primaryColor: string;

    @Is(function hexColor(value: string): void {
        if (!HEX_REGEX.test(value)) {
            throw new Error(`"${value}" is not a hex color value.`);
        }
    })
    @Column
    secondaryColor: string;

    @Is(HEX_REGEX)
    @Column
    tertiaryColor: string;

    @IsDate
    @IsBefore('2017-02-27')
    @Column
    producedAt: Date;
}